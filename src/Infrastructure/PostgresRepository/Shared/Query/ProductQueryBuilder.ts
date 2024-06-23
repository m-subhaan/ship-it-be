import { Brackets } from "typeorm";

import type { IProductEntity } from "@entities/Product/ProductEntity";
import type { IVariantEntity } from "@entities/Variant/VariantEntity";
import type { Product } from "@infrastructure/Database/Models/Product";
import type { TQueryBuilder } from "@src/typings/ORM";

export type TFilterProduct = Partial<IProductEntity & IVariantEntity & { text: string }>;
type TQueryBuilderProduct = TQueryBuilder<Product>;

export class ProductQueryBuilder {
  private query: TQueryBuilderProduct;
  constructor(query: TQueryBuilderProduct, filters: TFilterProduct) {
    this.query = query;

    this.setProductId(filters);
    this.setStatus(filters);
    this.setText(filters);
    this.setIsPromotion(filters);
    this.setIsPublish(filters);
    this.setCategoryId(filters);
    this.setSubCategoryId(filters);
  }

  static setFilter(query: TQueryBuilderProduct, filters) {
    return new ProductQueryBuilder(query, filters).query;
  }

  setProductId(filters: TFilterProduct) {
    if (filters.productId) {
      this.query.andWhere("product.productId = :productId", { productId: filters.productId });
    }
  }

  setStatus(filters: TFilterProduct) {
    if (filters.status) {
      this.query.andWhere("product.status = :status", { status: filters.status });
    }
  }

  setIsPromotion(filters: TFilterProduct) {
    if ("isPromotion" in filters && filters.isPromotion != null) {
      this.query.andWhere("variant.isPromotion = :isPromotion", { isPromotion: filters.isPromotion });
    }
  }

  setIsPublish(filters: TFilterProduct) {
    if ("isPublish" in filters && filters.isPublish != null) {
      this.query.andWhere("variant.isPublish = :isPublish", { isPublish: filters.isPublish });
    }
  }

  setText(filters: TFilterProduct) {
    if (filters.text) {
      this.query.andWhere(
        new Brackets((qb) => {
          qb.orWhere("product.title LIKE :text", { text: `%${filters.text}%` });
          qb.orWhere("product.vendor LIKE :text", { text: `%${filters.text}%` });
          qb.orWhere("product.brand LIKE :text", { text: `%${filters.text}%` });
          qb.orWhere("variant.sku LIKE :text", { text: `%${filters.text}%` });
          qb.orWhere("variant.title LIKE :text", { text: `%${filters.text}%` });
        })
      );
    }
  }

  setCategoryId(filters: TFilterProduct) {
    if (filters.categoryId) {
      this.query.andWhere("product.categoryId = :categoryId", { categoryId: filters.categoryId });
    }
  }

  setSubCategoryId(filters: TFilterProduct) {
    if (filters.subCategoryId) {
      this.query.andWhere("product.subCategoryId = :subCategoryId", { subCategoryId: filters.subCategoryId });
    }
  }
}
