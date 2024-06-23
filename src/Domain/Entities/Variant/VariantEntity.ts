export interface IVariantEntity {
  variantId: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
  maxPrice: number;
  sku: string;
  imageUrls: string[];
  isPromotion: boolean;
  promotionValue: number;
  isPublish: boolean;
  optionName1: string;
  optionValue1: string;
  optionName2: string;
  optionValue2: string;
  optionName3: string;
  optionValue3: string;
  productId: string;
}

export interface VariantEntity extends IVariantEntity { }

export class VariantEntity {
  constructor(variantEntity: VariantEntity) {
    this.variantId = variantEntity.variantId;
    this.title = variantEntity.title ? variantEntity.title.trim() : variantEntity.title;
    this.description = variantEntity.description ? variantEntity.description.trim() : variantEntity.description;
    this.quantity = variantEntity.quantity;
    this.price = variantEntity.price;
    this.maxPrice = variantEntity.maxPrice;
    this.sku = variantEntity.sku ? variantEntity.sku.trim() : variantEntity.sku;
    this.imageUrls = variantEntity.imageUrls;
    this.isPromotion = variantEntity.isPromotion;
    this.promotionValue = variantEntity.promotionValue;
    this.isPublish = variantEntity.isPublish;
    this.optionName1 = variantEntity.optionName1 ? variantEntity.optionName1.trim() : variantEntity.optionName1;
    this.optionValue1 = variantEntity.optionValue1 ? variantEntity.optionValue1.trim() : variantEntity.optionValue1;
    this.optionName2 = variantEntity.optionName2 ? variantEntity.optionName2.trim() : variantEntity.optionName2;
    this.optionValue2 = variantEntity.optionValue2 ? variantEntity.optionValue2.trim() : variantEntity.optionValue2;
    this.optionName3 = variantEntity.optionName3 ? variantEntity.optionName3.trim() : variantEntity.optionName3;
    this.optionValue3 = variantEntity.optionValue3 ? variantEntity.optionValue3.trim() : variantEntity.optionValue3;
    this.productId = variantEntity.productId;
  }

  static create(variantEntity) {
    return new VariantEntity(variantEntity);
  }
}
