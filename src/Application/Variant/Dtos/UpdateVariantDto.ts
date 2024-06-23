import type { IVariantEntity } from "@entities/Variant/VariantEntity";

type TUpdateVariantDto = Pick<IVariantEntity, "title" | "description" | "imageUrls" | "isPromotion" | "promotionValue" | "price" | "maxPrice" | "quantity" | "sku"
  | "optionName1" | "optionName2" | "optionName3" | "optionValue1" | "optionValue2" | "optionValue3" | "isPublish" | "productId" | "variantId"> & { deletedUrls: string[] };

export interface UpdateVariantDto extends TUpdateVariantDto { }

export class UpdateVariantDto {
  constructor(body: TUpdateVariantDto) {
    this.variantId = body.variantId;
    this.title = body.title;
    this.description = body.description;
    this.imageUrls = body.imageUrls;
    this.isPromotion = body.isPromotion;
    this.promotionValue = body.promotionValue;
    this.price = body.price;
    this.maxPrice = body.maxPrice;
    this.quantity = body.quantity;
    this.sku = body.sku;
    this.optionName1 = body.optionName1;
    this.optionName2 = body.optionName2;
    this.optionName3 = body.optionName3;
    this.optionValue1 = body.optionValue1;
    this.optionValue2 = body.optionValue2;
    this.optionValue3 = body.optionValue3;
    this.isPublish = body.isPublish;
    this.productId = body.productId;
    this.deletedUrls = body.deletedUrls;
  }

  static create(body: TUpdateVariantDto) {
    return new UpdateVariantDto(body);
  }
}
