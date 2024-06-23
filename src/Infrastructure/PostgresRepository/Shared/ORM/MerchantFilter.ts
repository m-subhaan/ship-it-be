import type { IMerchantEntity } from "@entities/Merchant/MerchantEntity";
import type { Merchant } from "@infrastructure/Database/Models/Merchant";
import type { TWhereFilter } from "@typings/ORM";

export type TFilterMerchant = Partial<IMerchantEntity>;
type TWhereMerchant = TWhereFilter<Merchant>;

export class MerchantFilter {
  private where: TWhereMerchant;
  constructor(filters: TFilterMerchant) {
    this.where = {};

    this.setEmail(filters);
    this.setStatus(filters);
  }

  static setFilter(filters: TFilterMerchant) {
    return new MerchantFilter(filters).where;
  }

  setEmail(filters: TFilterMerchant) {
    if (filters.email) {
      this.where.email = filters.email;
    }
  }

  setStatus(filters: TFilterMerchant) {
    if (filters.status) {
      this.where.status = filters.status;
    }
  }
}
