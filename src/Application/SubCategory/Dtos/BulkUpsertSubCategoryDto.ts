import type { ISubCategoryEntity } from "@entities/SubCategory/SubCategoryEntity";

type TUpsetSubCategory = Partial<Pick<ISubCategoryEntity, "subCategoryId" | "subCategoryName">>;
type TBulkUpsertSubCategoryDto = Pick<ISubCategoryEntity, "categoryId"> & { upsert: TUpsetSubCategory[] };

export interface BulkUpsertSubCategoryDto extends TBulkUpsertSubCategoryDto { }

export class BulkUpsertSubCategoryDto {
  constructor(body: TBulkUpsertSubCategoryDto) {
    this.categoryId = body.categoryId;
    this.upsert = body.upsert;
  }

  static create(body: TBulkUpsertSubCategoryDto) {
    return new BulkUpsertSubCategoryDto(body);
  }
}
