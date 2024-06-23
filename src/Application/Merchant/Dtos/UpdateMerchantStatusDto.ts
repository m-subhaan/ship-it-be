import type { IMerchantEntity } from "@entities/Merchant/MerchantEntity";

type TUpdateMerchantStatusDto = Pick<IMerchantEntity, "merchantId" | "status">;

export interface UpdateMerchantStatusDto extends TUpdateMerchantStatusDto { }

export class UpdateMerchantStatusDto {
  constructor(body: TUpdateMerchantStatusDto) {
    this.merchantId = body.merchantId;
    this.status = body.status;
  }

  static create(body: TUpdateMerchantStatusDto) {
    return new UpdateMerchantStatusDto(body);
  }
}
