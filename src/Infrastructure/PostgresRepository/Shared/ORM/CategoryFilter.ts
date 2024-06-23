import { Like } from "typeorm";

import type { ICategoryEntity } from "@entities/Category/CategoryEntity";
import type { Category } from "@infrastructure/Database/Models/Category";
import type { TWhereFilter } from "@typings/ORM";

type TFilterCategory = Partial<ICategoryEntity>;
type TWhereCategory = TWhereFilter<Category>;

class CategoryFilter {
  private where: TWhereCategory;
  constructor(filters: TFilterCategory) {
    this.where = {};

    this.setCategoryId(filters);
    this.setFirstName(filters);
  }

  static setFilter(filters: TFilterCategory) {
    return new CategoryFilter(filters).where;
  }

  setCategoryId(filters: TFilterCategory) {
    if (filters.categoryId) {
      this.where.categoryId = filters.categoryId;
    }
  }

  setFirstName(filters: TFilterCategory) {
    if (filters.categoryName) {
      this.where.categoryName = Like(`%${filters.categoryName}%`);
    }
  }
}

export default CategoryFilter;
