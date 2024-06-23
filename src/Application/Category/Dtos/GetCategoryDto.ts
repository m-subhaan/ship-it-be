import type { ICategoryEntity } from "@entities/Category/CategoryEntity";

type TGetCategoryDto = Partial<Pick<ICategoryEntity, "categoryId" | "categoryName"> & { isSubCategory: boolean }>;

export interface GetCategoryDto extends TGetCategoryDto { }

export class GetCategoryDto {
  constructor(body: TGetCategoryDto) {
    this.categoryId = body.categoryId as string;
    this.categoryName = body.categoryName as string;
    this.isSubCategory = (body.isSubCategory ? body.isSubCategory === ("true" as never) : null) as boolean;
  }

  static create(body: TGetCategoryDto) {
    return new GetCategoryDto(body);
  }
}
