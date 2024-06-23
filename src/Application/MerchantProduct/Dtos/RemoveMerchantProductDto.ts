import type { IMerchantProductEntity } from "@entities/MerchantProduct/MerchantProductEntity";

type TRemoveMerchantProductDto = Pick<IMerchantProductEntity, "merchantProductId" | "merchantId">;

export interface RemoveMerchantProductDto extends TRemoveMerchantProductDto { }

export class RemoveMerchantProductDto {
  constructor(body: TRemoveMerchantProductDto) {
    this.merchantProductId = body.merchantProductId;
    this.merchantId = body.merchantId;
  }

  static create(body: TRemoveMerchantProductDto) {
    return new RemoveMerchantProductDto(body);
  }
}
