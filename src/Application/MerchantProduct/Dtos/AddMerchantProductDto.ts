import type { IMerchantProductEntity } from "@entities/MerchantProduct/MerchantProductEntity";
import type { IMerchantVariantEntity } from "@entities/MerchantVariant/MerchantVariantEntity";

type TMerchantProduct = Pick<IMerchantProductEntity, "title" | "description" | "productId">;
type TMerchantVariant = Pick<IMerchantVariantEntity, "title" | "description" | "price" | "variantId">;

type TAddMerchantProductDto = {
  merchantId: string;
  products: (TMerchantProduct & { variants: TMerchantVariant[] })[]
};

export interface AddMerchantProductDto extends TAddMerchantProductDto { }

export class AddMerchantProductDto {
  constructor(body: TAddMerchantProductDto) {
    this.merchantId = body.merchantId;
    this.products = body.products;
  }

  static create(body: TAddMerchantProductDto) {
    return new AddMerchantProductDto(body);
  }
}
