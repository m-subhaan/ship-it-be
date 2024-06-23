import { Like } from "typeorm";

import type { IVariantEntity } from "@entities/Variant/VariantEntity";
import type { Variant } from "@infrastructure/Database/Models/Variant";
import type { TWhereFilter } from "@typings/ORM";

type TFilterVariant = Partial<IVariantEntity & { text: string }>;
type TWhereVariant = TWhereFilter<Variant>;

class VariantFilter {
  private where: TWhereVariant;
  constructor(filters: TFilterVariant) {
    this.where = {};

    this.setVariantId(filters);
    this.setTitle(filters);
    this.setSku(filters);
    this.setIsPromotion(filters);
    this.setIsPublish(filters);
    this.setProductId(filters);
  }

  static setFilter(filters: TFilterVariant) {
    return new VariantFilter(filters).where;
  }

  setVariantId(filters: TFilterVariant) {
    if (filters.variantId) {
      this.where.variantId = filters.variantId;
    }
  }

  setTitle(filters: TFilterVariant) {
    if (filters.text) {
      this.where.title = Like(`%${filters.text}%`);
    }
  }

  setSku(filters: TFilterVariant) {
    if (filters.text) {
      this.where.sku = Like(`%${filters.text}%`);
    }
  }

  setIsPromotion(filters: TFilterVariant) {
    if (filters.isPromotion) {
      this.where.isPromotion = filters.isPromotion;
    }
  }

  setIsPublish(filters: TFilterVariant) {
    if (filters.isPublish) {
      this.where.isPublish = filters.isPublish;
    }
  }

  setProductId(filters: TFilterVariant) {
    if (filters.productId) {
      this.where.productId = filters.productId;
    }
  }
}

export default VariantFilter;
