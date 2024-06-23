import type { ICategoryEntity } from "@entities/Category/CategoryEntity";

type TRemoveCategoryDto = Pick<ICategoryEntity, "categoryId">;

export interface RemoveCategoryDto extends TRemoveCategoryDto { }

export class RemoveCategoryDto {
  constructor(body: TRemoveCategoryDto) {
    this.categoryId = body.categoryId;
  }

  static create(body: TRemoveCategoryDto) {
    return new RemoveCategoryDto(body);
  }
}
