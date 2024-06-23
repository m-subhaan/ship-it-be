import type { IProductEntity } from "@entities/Product/ProductEntity";
import type { IVariantEntity } from "@entities/Variant/VariantEntity";

type TGetProductDto = Partial<Pick<IProductEntity, "productId" | "status" | "categoryId" | "subCategoryId"> &
  Pick<IVariantEntity, "isPromotion" | "isPublish"> & { text: string }>;

export interface GetProductDto extends TGetProductDto { }

export class GetProductDto {
  constructor(body: TGetProductDto) {
    this.productId = body.productId as string;
    this.text = body.text as string;
    this.status = body.status as string;
    this.categoryId = body.categoryId as string;
    this.subCategoryId = body.subCategoryId as string;
    this.isPromotion = (body.isPromotion ? body.isPromotion === ("true" as never) : null) as boolean;
    this.isPublish = (body.isPublish ? body.isPublish === ("true" as never) : null) as boolean;
  }

  static create(body: TGetProductDto) {
    return new GetProductDto(body);
  }
}
