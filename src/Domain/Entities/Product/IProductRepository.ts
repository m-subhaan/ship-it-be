import type IBaseRepository from "@entities/IBaseRepository";
import type { ProductEntity } from "@entities/Product/ProductEntity";
import type { Product } from "@infrastructure/Database/Models/Product";

import type PaginationOptions from "@infraUtils/PaginationOptions";
import type { TFilterProduct } from "@infrastructure/PostgresRepository/Shared/Query/ProductQueryBuilder";

export interface IProductRepository extends IBaseRepository<Product, ProductEntity> {
  fetchPaginatedByQuery(searchFilters: TFilterProduct, pagination: PaginationOptions): Promise<
    | false
    | {
      count: number;
      rows: Product[];
    }
  >;
}
