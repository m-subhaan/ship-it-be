import async from "async";
import { inject, injectable } from "tsyringe";

import { ProductEntity } from "@entities/Product/ProductEntity";
import { VariantEntity } from "@entities/Variant/VariantEntity";
import { CategoryEntity } from "@entities/Category/CategoryEntity";
import { SubCategoryEntity } from "@entities/SubCategory/SubCategoryEntity";

import HttpResponse from "@appUtils/HttpResponse";
import SharedUtils from "@appUtils/SharedUtils";

import PaginationData from "@infraUtils/PaginationData";
import PaginationOptions from "@infraUtils/PaginationOptions";

import { BaseService } from "@application/BaseService";

import ErrorLog from "@logger/ErrorLog";

import type { AddProductDto } from "./Dtos/AddProductDto";
import type { GetProductDto } from "./Dtos/GetProductDto";
import type { UpdateProductDto } from "./Dtos/UpdateProductDto";
import type { RemoveProductDto } from "./Dtos/RemoveProductDto";
import type { IProductRepository } from "@entities/Product/IProductRepository";
import type { IVariantRepository } from "@entities/Variant/IVariantRepository";
import type { Product } from "@infrastructure/Database/Models/Product";
import type { PaginationDTO } from "@infraUtils/PaginationDTO";

import { cloudStorageUtils } from "@infrastructure/DIContainer/Resolver";
import { BUCKET_FOLDERS, BUKCETS, SECONDS_IN, TIMEZONES } from "@appUtils/Constants";


@injectable()
export class ProductService extends BaseService<Product, ProductEntity> {
  constructor(
    @inject("IProductRepository") private productRepository: IProductRepository,
    @inject("IVariantRepository") private variantRepository: IVariantRepository
  ) {
    super(productRepository);
  }

  async addProduct(addProductDto: AddProductDto) {
    try {
      const productEntity = ProductEntity.create(addProductDto);
      productEntity.productId = SharedUtils.shortUuid();

      const variantEntity = VariantEntity.create(addProductDto.variant);
      variantEntity.variantId = SharedUtils.shortUuid();
      variantEntity.productId = productEntity.productId;

      const awsImages: { content: string | Buffer; filePath: string }[] = [];

      if (addProductDto.imageUrl) {
        productEntity.imageUrl = `product-${SharedUtils.shortUuid()}-${SharedUtils.getCurrentDate({ timezone: TIMEZONES.PAKISTAN_KARACHI })}.${SharedUtils.imageExtension(addProductDto.imageUrl)}`;
        awsImages.push({
          content: SharedUtils.base64Decoder(addProductDto.imageUrl.split(";base64,")[1] as string),
          filePath: `${BUCKET_FOLDERS.PRODUCT}/${productEntity.productId}/${productEntity.imageUrl}`
        });
      }

      if (addProductDto.variant.imageUrls?.length) {
        variantEntity.imageUrls = addProductDto.variant.imageUrls.map(i => {
          const imageUrl = `variant-${SharedUtils.shortUuid()}-${SharedUtils.getCurrentDate({ timezone: TIMEZONES.PAKISTAN_KARACHI })}.${SharedUtils.imageExtension(i)}`;
          awsImages.push({
            content: SharedUtils.base64Decoder(i.split(";base64,")[1] as string),
            filePath: `${BUCKET_FOLDERS.PRODUCT}/${productEntity.productId}/${BUCKET_FOLDERS.VARIANT}/${imageUrl}`
          });
          return imageUrl;
        })
      }

      const awsImagesUrl: string[] = [];
      if (awsImages.length) {
        await async.eachSeries(awsImages, async (arr) => {
          await cloudStorageUtils.uploadFile(
            BUKCETS.SHIP_IT,
            arr.content,
            arr.filePath
          );

          const awsImageUrl = await cloudStorageUtils.generateV4ReadSignedUrl(BUKCETS.SHIP_IT, arr.filePath, SECONDS_IN.ONE_WEEK);
          awsImagesUrl.push(awsImageUrl);
        });
      }

      await this.create(productEntity);

      if (addProductDto.variant) {
        await this.variantRepository.create(variantEntity);
      }

      return HttpResponse.created({
        ...ProductEntity.create({ ...productEntity, imageUrl: awsImagesUrl[0] }),
        variant: VariantEntity.create({ ...variantEntity, imageUrls: awsImagesUrl.slice(1) })
      });
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async getProducts(getProductDto: GetProductDto, paginationDto: PaginationDTO) {
    try {
      const pagination = PaginationOptions.create(paginationDto);
      const products = await this.productRepository.fetchPaginatedByQuery(getProductDto, pagination);

      if (!products) {
        return HttpResponse.notFound();
      }

      const productEntities: any = [];

      await async.eachSeries(products.rows, async (p) => {
        const productEntity = ProductEntity.create(p);
        const awsImageUrl = await cloudStorageUtils.bulkGenerateV4ReadSignedUrl(BUKCETS.SHIP_IT, productEntity, SECONDS_IN.ONE_DAY);
        productEntity.imageUrl = awsImageUrl[0] || "";

        const variantEntities: VariantEntity[] = [];
        await async.eachSeries(p.variant, async (v) => {
          const variantEntity = VariantEntity.create(v);
          variantEntity.imageUrls = await cloudStorageUtils.bulkGenerateV4ReadSignedUrl(BUKCETS.SHIP_IT, variantEntity, SECONDS_IN.ONE_DAY);
          variantEntities.push(variantEntity);
        });

        productEntities.push({
          ...productEntity,
          category: CategoryEntity.create(p.category),
          subCategory: p.subCategory && SubCategoryEntity.create(p.subCategory),
          variant: variantEntities
        })
      });

      return HttpResponse.ok(PaginationData.getPaginatedData(pagination, products.count, productEntities))
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    try {
      const searchFilters = { productId: updateProductDto.productId };

      const isProduct = await this.fetch(searchFilters);
      if (!isProduct) {
        return HttpResponse.notFound();
      }

      updateProductDto.productId = isProduct.productId;

      const productEntity = ProductEntity.create({ ...isProduct, ...updateProductDto });

      if (updateProductDto.imageUrl) {
        productEntity.imageUrl = `product-${SharedUtils.shortUuid()}-${SharedUtils.getCurrentDate({ timezone: TIMEZONES.PAKISTAN_KARACHI })}.${SharedUtils.imageExtension(updateProductDto.imageUrl)}`;
        const content = SharedUtils.base64Decoder(updateProductDto.imageUrl.split(";base64,")[1] as string);
        const filePath = `${BUCKET_FOLDERS.PRODUCT}/${productEntity.productId}/${productEntity.imageUrl}`;

        await cloudStorageUtils.uploadFile(
          BUKCETS.SHIP_IT,
          content,
          filePath
        );
      }
      await this.update({ productId: updateProductDto.productId }, productEntity);

      return HttpResponse.ok(productEntity);
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async removeProduct(removeProductDto: RemoveProductDto) {
    try {
      const searchFilters = { productId: removeProductDto.productId };

      const isProduct = await this.fetch(searchFilters);

      if (!isProduct) {
        return HttpResponse.notFound();
      }

      await this.remove({
        productId: isProduct.productId
      });

      return HttpResponse.noContent();
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }
}
