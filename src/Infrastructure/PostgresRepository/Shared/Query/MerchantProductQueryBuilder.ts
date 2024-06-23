import { Brackets } from "typeorm";

import type { IMerchantProductEntity } from "@entities/MerchantProduct/MerchantProductEntity";
import type { MerchantProduct } from "@infrastructure/Database/Models/MerchantProduct";
import type { TQueryBuilder } from "@src/typings/ORM";

export type TFilterMerchantProduct = Partial<IMerchantProductEntity & { text: string }>;
type TQueryBuilderMerchantProduct = TQueryBuilder<MerchantProduct>;

export class MerchantProductQueryBuilder {
  private query: TQueryBuilderMerchantProduct;
  constructor(query: TQueryBuilderMerchantProduct, filters: TFilterMerchantProduct) {
    this.query = query;

    this.setMerchantProductId(filters);
    this.setMerchantId(filters);
    this.setProductId(filters);
    this.setText(filters);
  }

  static setFilter(query: TQueryBuilderMerchantProduct, filters) {
    return new MerchantProductQueryBuilder(query, filters).query;
  }

  setMerchantProductId(filters: TFilterMerchantProduct) {
    if (filters.merchantProductId) {
      this.query.andWhere("merchantProduct.merchantProductId = :merchantProductId", { merchantProductId: filters.merchantProductId });
    }
  }

  setText(filters: TFilterMerchantProduct) {
    if (filters.text) {
      this.query.andWhere(
        new Brackets((qb) => {
          qb.orWhere("merchantProduct.title LIKE :text", { text: `%${filters.text}%` });
          qb.orWhere("merchantProduct.description LIKE :text", { text: `%${filters.text}%` });
          qb.orWhere("merchantVariant.title LIKE :text", { text: `%${filters.text}%` });
          qb.orWhere("merchantVariant.description LIKE :text", { text: `%${filters.text}%` });
        })
      );
    }
  }

  setMerchantId(filters: TFilterMerchantProduct) {
    if (filters.merchantId) {
      this.query.andWhere("merchantProduct.merchantId = :merchantId", { merchantId: filters.merchantId });
    }
  }

  setProductId(filters: TFilterMerchantProduct) {
    if (filters.productId) {
      this.query.andWhere("merchantProduct.productId = :productId", { productId: filters.productId });
    }
  }
}
