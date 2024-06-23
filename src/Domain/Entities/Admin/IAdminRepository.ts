import type { TSearchFilters } from "@typings/ORM";

import type { AdminEntity } from "@entities/Admin/AdminEntity";
import type IBaseRepository from "@entities/IBaseRepository";
import type { Admin } from "@infrastructure/Database/Models/Admin";
import type PaginationOptions from "@infraUtils/PaginationOptions";
import type { TFilterAdmin } from "@infrastructure/PostgresRepository/Shared/Query/AdminQueryBuilder";

export type TFetchAdminFilter = Omit<TSearchFilters<Admin>, "adminId"> & {
	adminId?: string[];
};

export interface IAdminRepository extends IBaseRepository<Admin, AdminEntity> {
	fetchBySearchQuery(searchFilters: TFilterAdmin): Promise<false | Admin[]>;
	fetchByQuery(searchFilters: TFilterAdmin): Promise<false | Admin>;
	fetchAllByQuery(searchFilters: TFilterAdmin): Promise<false | Admin[]>;
	fetchPaginatedByQuery(
		searchFilters: TFilterAdmin,
		pagination: PaginationOptions
	): Promise<
		| false
		| {
			count: number;
			rows: Admin[];
		}
	>;
}
