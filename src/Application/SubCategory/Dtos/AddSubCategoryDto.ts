import type { ISubCategoryEntity } from "@entities/SubCategory/SubCategoryEntity";

type TAddSubCategoryDto = Pick<ISubCategoryEntity, "subCategoryName" | "categoryId">;

export interface AddSubCategoryDto extends TAddSubCategoryDto { }

export class AddSubCategoryDto {
  constructor(body: TAddSubCategoryDto) {
    this.subCategoryName = body.subCategoryName;
    this.categoryId = body.categoryId;
  }

  static create(body: TAddSubCategoryDto) {
    return new AddSubCategoryDto(body);
  }
}
