import type { ICategoryEntity } from "@entities/Category/CategoryEntity";

type TAddCategoryDto = Pick<ICategoryEntity, "categoryName"> & { subCategoryName: string[] };

export interface AddCategoryDto extends TAddCategoryDto { }

export class AddCategoryDto {
  constructor(body: TAddCategoryDto) {
    this.categoryName = body.categoryName;
    this.subCategoryName = body.subCategoryName;
  }

  static create(body: TAddCategoryDto) {
    return new AddCategoryDto(body);
  }
}
