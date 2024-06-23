import { injectable } from "tsyringe";

import BaseRepository from "@infrastructure/PostgresRepository/BaseRepository";
import { AdminQueryBuilder } from "@infrastructure/PostgresRepository/Shared/Query/AdminQueryBuilder";
import { SEARCH_ADMIN_REPOSITORY_FIELDS } from "@infrastructure/PostgresRepository/Shared/Query/FieldsBuilder";

import { Admin } from "@infrastructure/Database/Models/Admin";

import type { AdminEntity } from "@entities/Admin/AdminEntity";
import type { IAdminRepository } from "@entities/Admin/IAdminRepository";
import type PaginationOptions from "@infraUtils/PaginationOptions";
import type { TFilterAdmin } from "@infrastructure/PostgresRepository/Shared/Query/AdminQueryBuilder";

@injectable()
export class AdminRepository extends BaseRepository<Admin, AdminEntity> implements IAdminRepository {
  constructor() {
    super(Admin);
  }

  async fetchBySearchQuery(searchFilters: TFilterAdmin) {
    const query = this.model
      .createQueryBuilder("admin")
      .where("1=1")
      .orderBy("admin.lastName", "ASC");

    const queryFilters = AdminQueryBuilder.setFilter(query, searchFilters);

    const admin = await queryFilters.select(SEARCH_ADMIN_REPOSITORY_FIELDS).getRawMany();

    if (admin.length === 0) {
      return false;
    }

    return admin;
  }

  async fetchByQuery(searchFilters: TFilterAdmin) {
    const query = this.model
      .createQueryBuilder("admin")
      .where("1=1")
      .orderBy("admin.lastName", "ASC");

    const queryFilters = AdminQueryBuilder.setFilter(query, searchFilters);

    const admin = await queryFilters.getOne();

    if (!admin) {
      return false;
    }

    return admin;
  }

  async fetchAllByQuery(searchFilters: TFilterAdmin) {
    const query = this.model
      .createQueryBuilder("admin")
      .where("1=1")
      .orderBy("admin.lastName", "ASC");

    const queryFilters = AdminQueryBuilder.setFilter(query, searchFilters);

    const admin = await queryFilters.getMany();

    if (admin.length === 0) {
      return false;
    }

    return admin;
  }

  async fetchPaginatedByQuery(searchFilters: TFilterAdmin, pagination: PaginationOptions) {
    const query = this.model
      .createQueryBuilder("admin")
      .take(pagination.perPage)
      .skip(pagination.offset)
      .orderBy("admin.lastName", "ASC");

    const countQuery = this.model
      .createQueryBuilder("admin");

    const queryFilters = AdminQueryBuilder.setFilter(query, searchFilters);
    const countFilters = AdminQueryBuilder.setFilter(countQuery, searchFilters);

    const admins = await queryFilters.getMany();
    const adminsCount = await countFilters.getCount();
    if (!admins.length) {
      return false;
    }

    return { count: adminsCount, rows: admins };
  }
}
