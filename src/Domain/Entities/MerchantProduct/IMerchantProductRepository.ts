import type IBaseRepository from "@entities/IBaseRepository";
import type { MerchantProductEntity } from "@entities/MerchantProduct/MerchantProductEntity";
import type { MerchantProduct } from "@infrastructure/Database/Models/MerchantProduct";

import type PaginationOptions from "@infraUtils/PaginationOptions";
import type { TFilterMerchantProduct } from "@infrastructure/PostgresRepository/Shared/Query/MerchantProductQueryBuilder";

export interface IMerchantProductRepository extends IBaseRepository<MerchantProduct, MerchantProductEntity> {
  fetchPaginatedByQuery(searchFilters: TFilterMerchantProduct, pagination: PaginationOptions): Promise<
    | false
    | {
      count: number;
      rows: MerchantProduct[];
    }
  >;
}
