import type { IMerchantEntity } from "@entities/Merchant/MerchantEntity";

type TUpdateMerchantDto = Pick<IMerchantEntity, "merchantId"> &
  Partial<
    Omit<IMerchantEntity, "password" | "resetPasswordToken"> & {
      images: { idFrontImage: string; idBackImage: string };
    }
  >;

export interface UpdateMerchantDto extends TUpdateMerchantDto { }

export class UpdateMerchantDto {
  constructor(body: TUpdateMerchantDto) {
    this.merchantId = body.merchantId;
    this.name = body.name as string;
    this.email = body.email as string;
    this.mobileNumber = body.mobileNumber as string;
    this.cnic = body.cnic as string;
    this.address = body.address as string;
    this.images = body.images as { idFrontImage: string; idBackImage: string };
    this.bankName = body.bankName as string;
    this.bankAccountTitle = body.bankAccountTitle as string;
    this.bankAccountNumber = body.bankAccountNumber as string;
    this.status = body.status as string;
  }

  static create(body: unknown) {
    return new UpdateMerchantDto(body as TUpdateMerchantDto);
  }
}
