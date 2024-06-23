import type { IMerchantProductEntity } from "@entities/MerchantProduct/MerchantProductEntity";
import type { IMerchantVariantEntity } from "@entities/MerchantVariant/MerchantVariantEntity";

type TMerchantVariant = Pick<IMerchantVariantEntity, "title" | "description" | "price" | "merchantVariantId">;
type TUpdateMerchantProductDto = Pick<IMerchantProductEntity, "title" | "description" | "merchantProductId" | "merchantId"> & {variants: TMerchantVariant[]};

export interface UpdateMerchantProductDto extends TUpdateMerchantProductDto { }

export class UpdateMerchantProductDto {
  constructor(body: TUpdateMerchantProductDto) {
    this.merchantId = body.merchantId;
    this.title = body.title;
    this.description = body.description;
    this.merchantProductId = body.merchantProductId;
    this.variants = body.variants;
  }

  static create(body: TUpdateMerchantProductDto) {
    return new UpdateMerchantProductDto(body);
  }
}
