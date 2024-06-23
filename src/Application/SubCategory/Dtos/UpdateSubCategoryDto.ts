import type { ISubCategoryEntity } from "@entities/SubCategory/SubCategoryEntity";

type TUpdateSubCategoryDto = Pick<ISubCategoryEntity, "subCategoryId" | "subCategoryName">;

export interface UpdateSubCategoryDto extends TUpdateSubCategoryDto { }

export class UpdateSubCategoryDto {
  constructor(body: TUpdateSubCategoryDto) {
    this.subCategoryId = body.subCategoryId;
    this.subCategoryName = body.subCategoryName;
  }

  static create(body: TUpdateSubCategoryDto) {
    return new UpdateSubCategoryDto(body);
  }
}
