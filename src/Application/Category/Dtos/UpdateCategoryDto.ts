import type { ICategoryEntity } from "@entities/Category/CategoryEntity";

type TUpdateCategoryDto = Pick<ICategoryEntity, "categoryId" | "categoryName">;

export interface UpdateCategoryDto extends TUpdateCategoryDto { }

export class UpdateCategoryDto {
  constructor(body: TUpdateCategoryDto) {
    this.categoryId = body.categoryId;
    this.categoryName = body.categoryName;
  }

  static create(body: TUpdateCategoryDto) {
    return new UpdateCategoryDto(body);
  }
}
