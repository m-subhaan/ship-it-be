import type { IMerchantEntity } from "@entities/Merchant/MerchantEntity";

type TGetMerchantDto = Partial<Pick<IMerchantEntity, "status"> & { text: string }>;

export interface GetMerchantDto extends TGetMerchantDto { }

export class GetMerchantDto {
  constructor(body: TGetMerchantDto) {
    this.status = body.status as string;
    this.text = body.text as string;
  }

  static create(body: TGetMerchantDto) {
    return new GetMerchantDto(body);
  }
}
