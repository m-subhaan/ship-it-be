import type { IMerchantProductEntity } from "@entities/MerchantProduct/MerchantProductEntity";

type TGetMerchantProductDto = Partial<Pick<IMerchantProductEntity, "merchantProductId" | "merchantId" | "productId"> & { text: string }>;

export interface GetMerchantProductDto extends TGetMerchantProductDto { }

export class GetMerchantProductDto {
  constructor(body: TGetMerchantProductDto) {
    this.merchantProductId = body.merchantProductId as string;
    this.merchantId = body.merchantId as string;
    this.productId = body.productId as string;
    this.text = body.text as string;
  }

  static create(body: TGetMerchantProductDto) {
    return new GetMerchantProductDto(body);
  }
}
