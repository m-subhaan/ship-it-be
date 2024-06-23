import type { IMerchantProductEntity } from "@entities/MerchantProduct/MerchantProductEntity";
import type { MerchantProduct } from "@infrastructure/Database/Models/MerchantProduct";
import type { TWhereFilter } from "@typings/ORM";

type TFilterMerchantProduct = Partial<IMerchantProductEntity & { text: string }>;
type TWhereMerchantProduct = TWhereFilter<MerchantProduct>;

class MerchantProductFilter {
  private where: TWhereMerchantProduct;
  constructor(filters: TFilterMerchantProduct) {
    this.where = {};

    this.setMerchantProductId(filters);
    this.setMerchantId(filters);
  }

  static setFilter(filters: TFilterMerchantProduct) {
    return new MerchantProductFilter(filters).where;
  }

  setMerchantProductId(filters: TFilterMerchantProduct) {
    if (filters.merchantProductId) {
      this.where.merchantProductId = filters.merchantProductId;
    }
  }

  setMerchantId(filters: TFilterMerchantProduct) {
    if (filters.merchantId) {
      this.where.merchantId = filters.merchantId;
    }
  }
}

export default MerchantProductFilter;
