import type { IMerchantEntity } from "@entities/Merchant/MerchantEntity";

type TAddMerchantDto = Pick<IMerchantEntity, "name" | "email" | "mobileNumber" | "address">;

export interface AddMerchantDto extends TAddMerchantDto { }

export class AddMerchantDto {
	constructor(body: TAddMerchantDto) {
		this.name = body.name;
		this.email = body.email;
		this.mobileNumber = body.mobileNumber;
		this.address = body.address;
	}

	static create(body: unknown) {
		return new AddMerchantDto(body as TAddMerchantDto);
	}
}
