export interface IMerchantVariantEntity {
  merchantVariantId: string;
  title: string;
  description: string;
  price: number;
  merchantProductId: string;
  variantId: string;
}

export interface MerchantVariantEntity extends IMerchantVariantEntity { }

export class MerchantVariantEntity {
  constructor(variantEntity: MerchantVariantEntity) {
    this.merchantVariantId = variantEntity.merchantVariantId;
    this.title = variantEntity.title ? variantEntity.title.trim() : variantEntity.title;
    this.description = variantEntity.description ? variantEntity.description.trim() : variantEntity.description;
    this.price = variantEntity.price;
    this.merchantProductId = variantEntity.merchantProductId;
    this.variantId = variantEntity.variantId;
  }

  static create(variantEntity) {
    return new MerchantVariantEntity(variantEntity);
  }
}
