export interface ICategoryEntity {
  categoryId: string;
  categoryName: string;
}

export interface CategoryEntity extends ICategoryEntity { }

export class CategoryEntity {
  constructor(categoryEntity: CategoryEntity) {
    this.categoryId = categoryEntity.categoryId;
    this.categoryName = categoryEntity.categoryName ? categoryEntity.categoryName.trim() : categoryEntity.categoryName;
  }

  static create(categoryEntity) {
    return new CategoryEntity(categoryEntity);
  }
}
