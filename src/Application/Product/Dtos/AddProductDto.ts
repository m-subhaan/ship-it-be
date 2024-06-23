import type { IProductEntity } from "@entities/Product/ProductEntity";
import type { IVariantEntity } from "@entities/Variant/VariantEntity";

type TProduct = Pick<IProductEntity, "title" | "description" | "brand" | "vendor" | "status" | "categoryId" | "subCategoryId" | "imageUrl">;
type TVariant = Pick<IVariantEntity, "title" | "description" | "imageUrls" | "isPromotion" | "promotionValue" | "price" | "maxPrice" | "quantity" | "sku"
  | "optionName1" | "optionName2" | "optionName3" | "optionValue1" | "optionValue2" | "optionValue3" | "isPublish">;

type TAddProductDto = TProduct & {
  variant: TVariant
};

export interface AddProductDto extends TAddProductDto { }

export class AddProductDto {
  constructor(body: TAddProductDto) {
    this.title = body.title;
    this.description = body.description;
    this.brand = body.brand;
    this.vendor = body.vendor;
    this.status = body.status;
    this.categoryId = body.categoryId;
    this.subCategoryId = body.subCategoryId;
    this.imageUrl = body.imageUrl;
    this.variant = body.variant;
  }

  static create(body: TAddProductDto) {
    return new AddProductDto(body);
  }
}
