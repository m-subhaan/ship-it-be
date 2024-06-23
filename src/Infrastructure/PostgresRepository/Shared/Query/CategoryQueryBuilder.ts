import type { ICategoryEntity } from "@entities/Category/CategoryEntity";
import type { Category } from "@infrastructure/Database/Models/Category";
import type { TQueryBuilder } from "@src/typings/ORM";

export type TFilterCategory = Partial<ICategoryEntity>;
type TQueryBuilderCategory = TQueryBuilder<Category>;

export class CategoryQueryBuilder {
  private query: TQueryBuilderCategory;
  constructor(query: TQueryBuilderCategory, filters: TFilterCategory) {
    this.query = query;

    this.setCategoryId(filters);
    this.setCategoryName(filters);
  }

  static setFilter(query: TQueryBuilderCategory, filters) {
    return new CategoryQueryBuilder(query, filters).query;
  }

  setCategoryId(filters: TFilterCategory) {
    if (filters.categoryId) {
      this.query.andWhere("category.categoryId = :categoryId", { categoryId: filters.categoryId });
    }
  }

  setCategoryName(filters: TFilterCategory) {
    if (filters.categoryName) {
      this.query.andWhere("category.categoryName LIKE :categoryName", { categoryName: `%${filters.categoryName}%` });
    }
  }
}
