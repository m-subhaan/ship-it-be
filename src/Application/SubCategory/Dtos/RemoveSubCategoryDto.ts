import type { ISubCategoryEntity } from "@entities/SubCategory/SubCategoryEntity";

type TRemoveSubCategoryDto = Pick<ISubCategoryEntity, "subCategoryId">;

export interface RemoveSubCategoryDto extends TRemoveSubCategoryDto { }

export class RemoveSubCategoryDto {
  constructor(body: TRemoveSubCategoryDto) {
    this.subCategoryId = body.subCategoryId;
  }

  static create(body: TRemoveSubCategoryDto) {
    return new RemoveSubCategoryDto(body);
  }
}
