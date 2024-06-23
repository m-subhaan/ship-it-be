import type PaginationOptions from "@infraUtils/PaginationOptions";

class PaginationData<T> {
  paginationInfo: { totalItems: number; totalPages: number; currentPage: number; perPage: number };
  rows: T;
  constructor(paginationOptions: PaginationOptions, itemCount: number, items: T) {
    this.paginationInfo = {
      totalItems: itemCount,
      totalPages: Math.ceil(itemCount / paginationOptions.perPage),
      currentPage: paginationOptions.currentPage,
      perPage: paginationOptions.perPage
    };
    this.rows = items;
  }

  static getPaginatedData<T>(paginationOptions: PaginationOptions, itemCount: number, items: T) {
    return new PaginationData(paginationOptions, itemCount, items);
  }
}

export default PaginationData;
