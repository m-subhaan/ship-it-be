import { injectable } from "tsyringe";

import BaseRepository from "@repositories/BaseRepository";
import { ProductQueryBuilder } from "@infrastructure/PostgresRepository/Shared/Query/ProductQueryBuilder";

import { Product } from "@infrastructure/Database/Models/Product";

import type { ProductEntity } from "@entities/Product/ProductEntity";
import type { IProductRepository } from "@entities/Product/IProductRepository";
import type PaginationOptions from "@infraUtils/PaginationOptions";
import type { TFilterProduct } from "@infrastructure/PostgresRepository/Shared/Query/ProductQueryBuilder";

@injectable()
export class ProductRepository extends BaseRepository<Product, ProductEntity> implements IProductRepository {
  constructor() {
    super(Product);
  }

  async fetchPaginatedByQuery(searchFilters: TFilterProduct, pagination: PaginationOptions) {
    const query = this.model
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.variant", "variant")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.subCategory", "subCategory")
      .take(pagination.perPage)
      .skip(pagination.offset)
      .orderBy("product.title", "ASC");

    const countQuery = this.model
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.variant", "variant")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.subCategory", "subCategory");

    const queryFilters = ProductQueryBuilder.setFilter(query, searchFilters);
    const countFilters = ProductQueryBuilder.setFilter(countQuery, searchFilters);

    const products = await queryFilters.getMany();
    const productsCount = await countFilters.getCount();
    if (!products.length) {
      return false;
    }

    return { count: productsCount, rows: products };
  }
}
