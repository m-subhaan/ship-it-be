import async from "async";
import { inject, injectable } from "tsyringe";

import { VariantEntity } from "@entities/Variant/VariantEntity";

import HttpResponse from "@appUtils/HttpResponse";
import SharedUtils from "@appUtils/SharedUtils";

import { BaseService } from "@application/BaseService";

import VariantFilter from "@repositories/Shared/ORM/VariantFilter";

import ErrorLog from "@logger/ErrorLog";

import type { AddVariantDto } from "./Dtos/AddVariantDto";
import type { GetVariantDto } from "./Dtos/GetVariantDto";
import type { UpdateVariantDto } from "./Dtos/UpdateVariantDto";
import type { RemoveVariantDto } from "./Dtos/RemoveVariantDto";
import type { IVariantRepository } from "@entities/Variant/IVariantRepository";
import type { Variant } from "@infrastructure/Database/Models/Variant";

import { cloudStorageUtils } from "@infrastructure/DIContainer/Resolver";
import { BUCKET_FOLDERS, BUKCETS, SECONDS_IN, TIMEZONES } from "@appUtils/Constants";


@injectable()
export class VariantService extends BaseService<Variant, VariantEntity> {
  constructor(
    @inject("IVariantRepository") private variantRepository: IVariantRepository
  ) {
    super(variantRepository);
  }

  async addVariant(addVariantDto: AddVariantDto) {
    try {
      const variantEntity = VariantEntity.create(addVariantDto);
      variantEntity.variantId = SharedUtils.shortUuid();
      variantEntity.productId = variantEntity.productId;

      const awsImages: { content: string | Buffer; filePath: string }[] = [];

      if (addVariantDto.imageUrls?.length) {
        variantEntity.imageUrls = addVariantDto.imageUrls.map(i => {
          const imageUrl = `variant-${SharedUtils.shortUuid()}-${SharedUtils.getCurrentDate({ timezone: TIMEZONES.PAKISTAN_KARACHI })}.${SharedUtils.imageExtension(i)}`;
          awsImages.push({
            content: SharedUtils.base64Decoder(i.split(";base64,")[1] as string),
            filePath: `${BUCKET_FOLDERS.PRODUCT}/${variantEntity.productId}/${BUCKET_FOLDERS.VARIANT}/${imageUrl}`
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

      await this.variantRepository.create(variantEntity);

      return HttpResponse.created({ ...VariantEntity.create({ ...variantEntity, imageUrls: awsImagesUrl }) });
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async getVariants(getVariantDto: GetVariantDto) {
    try {
      const searchFilters = VariantFilter.setFilter(getVariantDto);
      const variants = await this.fetchAll(searchFilters, { title: "ASC" });

      if (!variants) {
        return HttpResponse.notFound();
      }

      const variantEntities: VariantEntity[] = [];
      await async.eachSeries(variants, async (v) => {
        const variantEntity = VariantEntity.create(v);
        variantEntity.imageUrls = await cloudStorageUtils.bulkGenerateV4ReadSignedUrl(BUKCETS.SHIP_IT, variantEntity, SECONDS_IN.ONE_DAY);
        variantEntities.push(variantEntity);
      });

      return HttpResponse.ok(variantEntities)
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async updateVariant(updateVariantDto: UpdateVariantDto) {
    try {
      const searchFilters = { variantId: updateVariantDto.variantId };

      const isVariant = await this.fetch(searchFilters);
      if (!isVariant) {
        return HttpResponse.notFound();
      }

      updateVariantDto.variantId = isVariant.variantId;

      const variantEntity = VariantEntity.create({ ...isVariant, ...updateVariantDto });
      variantEntity.imageUrls = updateVariantDto.deletedUrls?.length ?
        isVariant.imageUrls.filter(url => !updateVariantDto.deletedUrls.includes(url)) :
        isVariant.imageUrls;

      const imageUrls: string[] = []
      if (updateVariantDto.imageUrls?.length) {
        await async.eachSeries(updateVariantDto.imageUrls, async (imageContent) => {
          const imageUrl = `variant-${SharedUtils.shortUuid()}-${SharedUtils.getCurrentDate({ timezone: TIMEZONES.PAKISTAN_KARACHI })}.${SharedUtils.imageExtension(imageContent)}`;
          const content = SharedUtils.base64Decoder(imageContent.split(";base64,")[1] as string);
          const filePath = `${BUCKET_FOLDERS.PRODUCT}/${variantEntity.productId}/${imageUrl}`;

          imageUrls.push(imageUrl);

          await cloudStorageUtils.uploadFile(
            BUKCETS.SHIP_IT,
            content,
            filePath
          );
        });
      }

      variantEntity.imageUrls = variantEntity.imageUrls?.length ? [...variantEntity.imageUrls, ...imageUrls] : imageUrls;

      await this.update({ variantId: updateVariantDto.variantId }, variantEntity);

      variantEntity.imageUrls = await cloudStorageUtils.bulkGenerateV4ReadSignedUrl(BUKCETS.SHIP_IT, variantEntity, SECONDS_IN.ONE_DAY);

      return HttpResponse.ok(variantEntity);
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async removeVariant(removeVariantDto: RemoveVariantDto) {
    try {
      const searchFilters = { variantId: removeVariantDto.variantId };

      const isVariant = await this.fetch(searchFilters);

      if (!isVariant) {
        return HttpResponse.notFound();
      }

      await this.remove({
        variantId: isVariant.variantId
      });

      return HttpResponse.noContent();
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }
}
