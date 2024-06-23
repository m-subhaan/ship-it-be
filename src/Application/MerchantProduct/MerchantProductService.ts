import async from "async";
import { inject, injectable } from "tsyringe";

import { MerchantProductEntity } from "@entities/MerchantProduct/MerchantProductEntity";
import { MerchantVariantEntity } from "@entities/MerchantVariant/MerchantVariantEntity";
import { ProductEntity } from "@entities/Product/ProductEntity";
import { VariantEntity } from "@entities/Variant/VariantEntity";
import { CategoryEntity } from "@entities/Category/CategoryEntity";
import { SubCategoryEntity } from "@entities/SubCategory/SubCategoryEntity";

import HttpResponse from "@appUtils/HttpResponse";
import SharedUtils from "@appUtils/SharedUtils";

import PaginationData from "@infraUtils/PaginationData";
import PaginationOptions from "@infraUtils/PaginationOptions";

import { BaseService } from "@application/BaseService";

import MerchantProductFilter from "@repositories/Shared/ORM/MerchantProductFilter";

import ErrorLog from "@logger/ErrorLog";

import type { AddMerchantProductDto } from "./Dtos/AddMerchantProductDto";
import type { GetMerchantProductDto } from "./Dtos/GetMerchantProductDto";
import type { UpdateMerchantProductDto } from "./Dtos/UpdateMerchantProductDto";
import type { RemoveMerchantProductDto } from "./Dtos/RemoveMerchantProductDto";
import type { IMerchantProductRepository } from "@entities/MerchantProduct/IMerchantProductRepository";
import type { IMerchantVariantRepository } from "@entities/MerchantVariant/IMerchantVariantRepository";
import type { MerchantProduct } from "@infrastructure/Database/Models/MerchantProduct";
import type { PaginationDTO } from "@infraUtils/PaginationDTO";

import { cloudStorageUtils } from "@infrastructure/DIContainer/Resolver";
import { BUKCETS, NOT_FOUND_MESSAGES, SECONDS_IN } from "@appUtils/Constants";


@injectable()
export class MerchantProductService extends BaseService<MerchantProduct, MerchantProductEntity> {
  constructor(
    @inject("IMerchantProductRepository") private merchantProductRepository: IMerchantProductRepository,
    @inject("IMerchantVariantRepository") private merchantvariantRepository: IMerchantVariantRepository
  ) {
    super(merchantProductRepository);
  }

  async addMerchantProduct(addMerchantProductDto: AddMerchantProductDto) {
    try {
      const merchantVariantEntities: MerchantVariantEntity[] = [];
      const merchantProductEntities = addMerchantProductDto.products.map(p => {
        const merchantProductEntity = MerchantProductEntity.create(p);
        merchantProductEntity.merchantProductId = SharedUtils.shortUuid();
        merchantProductEntity.merchantId = addMerchantProductDto.merchantId;

        p.variants.forEach(v => {
          const merchantVariantEntity = MerchantVariantEntity.create(v);
          merchantVariantEntity.merchantVariantId = SharedUtils.shortUuid();
          merchantVariantEntity.merchantProductId = merchantProductEntity.merchantProductId;
          merchantVariantEntities.push(merchantVariantEntity);
        });

        return merchantProductEntity;
      });

      await this.merchantProductRepository.bulkInsert(merchantProductEntities);
      await this.merchantvariantRepository.bulkInsert(merchantVariantEntities);

      return HttpResponse.created({ message: "Products added ssuccessfully" });
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async getMerchantProducts(getMerchantProductDto: GetMerchantProductDto, paginationDto: PaginationDTO) {
    try {
      const pagination = PaginationOptions.create(paginationDto);
      const merchantProducts = await this.merchantProductRepository.fetchPaginatedByQuery(getMerchantProductDto, pagination);

      if (!merchantProducts) {
        return HttpResponse.notFound();
      }

      const productEntities: any = [];

      await async.eachSeries(merchantProducts.rows, async (p) => {
        const { product, merchantVariant } = p;
        const merchantProductEntity = MerchantProductEntity.create(p);
        const productEntity = ProductEntity.create(product);
        const awsImageUrl = await cloudStorageUtils.bulkGenerateV4ReadSignedUrl(BUKCETS.SHIP_IT, productEntity, SECONDS_IN.ONE_DAY);
        productEntity.imageUrl = awsImageUrl[0] || "";

        const variantEntities: (MerchantVariantEntity & VariantEntity)[] = [];
        await async.eachSeries(merchantVariant, async (v) => {
          const merchantVariantEntity = MerchantVariantEntity.create(v);
          const variantEntity = VariantEntity.create(v.variant);
          variantEntity.imageUrls = await cloudStorageUtils.bulkGenerateV4ReadSignedUrl(BUKCETS.SHIP_IT, variantEntity, SECONDS_IN.ONE_DAY);
          variantEntities.push({ ...variantEntity, ...merchantVariantEntity });
        });

        productEntities.push({
          ...productEntity,
          ...merchantProductEntity,
          category: CategoryEntity.create(product.category),
          subCategory: product.subCategory && SubCategoryEntity.create(product.subCategory),
          variant: variantEntities
        })
      });

      return HttpResponse.ok(PaginationData.getPaginatedData(pagination, merchantProducts.count, productEntities));
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async updateMerchantProduct(updateMerchantProductDto: UpdateMerchantProductDto) {
    try {
      const searchFilters = MerchantProductFilter.setFilter(updateMerchantProductDto);

      const isMerchantProduct = await this.fetch(searchFilters);
      if (!isMerchantProduct) {
        return HttpResponse.notFound({ message: NOT_FOUND_MESSAGES.MERCHANT_PRODUCT });
      }

      const merchantProductEntity = MerchantProductEntity.create({ ...isMerchantProduct, ...updateMerchantProductDto });
      await this.update({ merchantProductId: updateMerchantProductDto.merchantProductId }, merchantProductEntity);

      await async.eachSeries(updateMerchantProductDto.variants, async (v) => {
        const isMerchantVariant = await this.merchantvariantRepository.fetch({ merchantVariantId: v.merchantVariantId });
        if (!isMerchantVariant) {
          throw new Error(NOT_FOUND_MESSAGES.MERCHANT_VARIANT);
        }

        const merchantVariantEntity = MerchantVariantEntity.create({ ...isMerchantVariant, ...v });
        await this.merchantvariantRepository.update({ merchantVariantId: merchantVariantEntity.merchantVariantId }, merchantVariantEntity);
      });

      return HttpResponse.ok({ message: "Products updated ssuccessfully" });
    } catch (error) {
      if ((error as Error).message === NOT_FOUND_MESSAGES.MERCHANT_VARIANT) {
        return HttpResponse.notFound({ message: (error as Error).message });
      }
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async removeMerchantProduct(removeMerchantProductDto: RemoveMerchantProductDto) {
    try {
      const searchFilters = MerchantProductFilter.setFilter(removeMerchantProductDto);

      const isMerchantProduct = await this.fetch(searchFilters);

      if (!isMerchantProduct) {
        return HttpResponse.notFound();
      }

      await this.remove({
        merchantProductId: isMerchantProduct.merchantProductId
      });

      return HttpResponse.noContent();
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }
}
