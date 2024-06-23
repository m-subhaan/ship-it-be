export interface IMerchantProductEntity {
  merchantProductId: string;
  title: string;
  description: string;
  merchantId: string;
  productId: string;
}

export interface MerchantProductEntity extends IMerchantProductEntity { }

export class MerchantProductEntity {
  constructor(merchantProductEntity: MerchantProductEntity) {
    this.merchantProductId = merchantProductEntity.merchantProductId;
    this.title = merchantProductEntity.title ? merchantProductEntity.title.trim() : merchantProductEntity.title;
    this.description = merchantProductEntity.description ? merchantProductEntity.description.trim() : merchantProductEntity.description;
    this.merchantId = merchantProductEntity.merchantId;
    this.productId = merchantProductEntity.productId;
  }

  static create(productEntity) {
    return new MerchantProductEntity(productEntity);
  }
}
