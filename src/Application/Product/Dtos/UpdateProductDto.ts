import type { IProductEntity } from "@entities/Product/ProductEntity";

type TUpdateProductDto = Pick<IProductEntity, "productId" | "title" | "description" | "brand" | "vendor" | "status" | "categoryId" | "subCategoryId" | "imageUrl">;

export interface UpdateProductDto extends TUpdateProductDto { }

export class UpdateProductDto {
  constructor(body: TUpdateProductDto) {
    this.productId = body.productId;
    this.title = body.title;
    this.description = body.description;
    this.brand = body.brand;
    this.vendor = body.vendor;
    this.status = body.status;
    this.imageUrl = body.imageUrl;
    this.categoryId = body.categoryId;
    this.subCategoryId = body.subCategoryId;
  }

  static create(body: TUpdateProductDto) {
    return new UpdateProductDto(body);
  }
}
