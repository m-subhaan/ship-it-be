import { Like } from "typeorm";

import type { IProductEntity } from "@entities/Product/ProductEntity";
import type { Product } from "@infrastructure/Database/Models/Product";
import type { TWhereFilter } from "@typings/ORM";

type TFilterProduct = Partial<IProductEntity & { text: string }>;
type TWhereProduct = TWhereFilter<Product>;

class ProductFilter {
  private where: TWhereProduct;
  constructor(filters: TFilterProduct) {
    this.where = {};

    this.setProductId(filters);
    this.setTitle(filters);
    this.setVendor(filters);
    this.setBrand(filters);
    this.setCategoryId(filters);
    this.setSubCategoryId(filters);
  }

  static setFilter(filters: TFilterProduct) {
    return new ProductFilter(filters).where;
  }

  setProductId(filters: TFilterProduct) {
    if (filters.productId) {
      this.where.productId = filters.productId;
    }
  }

  setTitle(filters: TFilterProduct) {
    if (filters.text) {
      this.where.title = Like(`%${filters.text}%`);
    }
  }

  setVendor(filters: TFilterProduct) {
    if (filters.text) {
      this.where.vendor = Like(`%${filters.text}%`);
    }
  }

  setBrand(filters: TFilterProduct) {
    if (filters.text) {
      this.where.brand = Like(`%${filters.text}%`);
    }
  }

  setCategoryId(filters: TFilterProduct) {
    if (filters.categoryId) {
      this.where.categoryId = filters.categoryId;
    }
  }

  setSubCategoryId(filters: TFilterProduct) {
    if (filters.subCategoryId) {
      this.where.subCategoryId = filters.subCategoryId;
    }
  }
}

export default ProductFilter;
