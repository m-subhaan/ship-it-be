import { injectable } from "tsyringe";

import BaseRepository from "@repositories/BaseRepository";
import { MerchantProductQueryBuilder } from "@infrastructure/PostgresRepository/Shared/Query/MerchantProductQueryBuilder";

import { MerchantProduct } from "@infrastructure/Database/Models/MerchantProduct";

import type { MerchantProductEntity } from "@entities/MerchantProduct/MerchantProductEntity";
import type { IMerchantProductRepository } from "@entities/MerchantProduct/IMerchantProductRepository";
import type PaginationOptions from "@infraUtils/PaginationOptions";
import type { TFilterMerchantProduct } from "@infrastructure/PostgresRepository/Shared/Query/MerchantProductQueryBuilder";

@injectable()
export class MerchantProductRepository extends BaseRepository<MerchantProduct, MerchantProductEntity> implements IMerchantProductRepository {
  constructor() {
    super(MerchantProduct);
  }

  async fetchPaginatedByQuery(searchFilters: TFilterMerchantProduct, pagination: PaginationOptions) {
    const query = this.model
      .createQueryBuilder("merchantProduct")
      .leftJoinAndSelect("merchantProduct.merchantVariant", "merchantVariant")
      .leftJoinAndSelect("merchantProduct.product", "product")
      .leftJoinAndSelect("merchantVariant.variant", "variant")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.subCategory", "subCategory")
      .take(pagination.perPage)
      .skip(pagination.offset)
      .orderBy("merchantProduct.title", "ASC");

    const countQuery = this.model
      .createQueryBuilder("merchantProduct")
      .leftJoinAndSelect("merchantProduct.merchantVariant", "merchantVariant")
      .leftJoinAndSelect("merchantProduct.product", "product")
      .leftJoinAndSelect("merchantVariant.variant", "variant")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.subCategory", "subCategory");

    const queryFilters = MerchantProductQueryBuilder.setFilter(query, searchFilters);
    const countFilters = MerchantProductQueryBuilder.setFilter(countQuery, searchFilters);

    const products = await queryFilters.getMany();
    const productsCount = await countFilters.getCount();
    if (!products.length) {
      return false;
    }

    return { count: productsCount, rows: products };
  }
}
