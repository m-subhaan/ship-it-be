export interface ISubCategoryEntity {
  subCategoryId: string;
  subCategoryName: string;
  categoryId: string;
}

export interface SubCategoryEntity extends ISubCategoryEntity { }

export class SubCategoryEntity {
  constructor(subCategoryEntity: SubCategoryEntity) {
    this.subCategoryId = subCategoryEntity.subCategoryId;
    this.subCategoryName = subCategoryEntity.subCategoryName ? subCategoryEntity.subCategoryName.trim() : subCategoryEntity.subCategoryName;
    this.categoryId = subCategoryEntity.categoryId;
  }

  static create(subCategoryEntity) {
    return new SubCategoryEntity(subCategoryEntity);
  }
}
