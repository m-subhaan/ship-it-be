import { Brackets } from "typeorm";

import type { IAdminEntity } from "@entities/Admin/AdminEntity";
import type { Admin } from "@infrastructure/Database/Models/Admin";
import type { TQueryBuilder } from "@src/typings/ORM";

export type TFilterAdmin = Partial<IAdminEntity> & { adminTypes?: string[]; notAdminType?: string[]; text?: string };
type TQueryBuilderAdmin = TQueryBuilder<Admin>;

export class AdminQueryBuilder {
  private query: TQueryBuilderAdmin;
  constructor(query: TQueryBuilderAdmin, filters: TFilterAdmin) {
    this.query = query;

    this.setAdminId(filters);
    this.setFirstName(filters);
    this.setLastName(filters);
    this.setEmail(filters);
    this.setAdminType(filters);
    this.setText(filters);
  }

  static setFilter(query: TQueryBuilderAdmin, filters) {
    return new AdminQueryBuilder(query, filters).query;
  }

  setAdminId(filters: TFilterAdmin) {
    if (Array.isArray(filters.adminId)) {
      this.query.andWhere("admin.adminId IN (:...adminId)", { adminId: filters.adminId });

      return;
    }

    if (filters.adminId) {
      this.query.andWhere("admin.adminId = :adminId", { adminId: filters.adminId });
    }
  }

  setText(filters: TFilterAdmin) {
    if (filters.text) {
      this.query.andWhere(
        new Brackets((qb) => {
          qb.orWhere("admin.firstName LIKE :text", { text: `%${filters.text}%` });
          qb.orWhere("admin.lastName LIKE :text", { text: `%${filters.text}%` });
        })
      );
    }
  }

  setFirstName(filters: TFilterAdmin) {
    if (filters.firstName) {
      this.query.andWhere(
        new Brackets((qb) => {
          qb.orWhere("admin.firstName LIKE :firstName", { firstName: `%${filters.firstName}%` });
          qb.orWhere("admin.lastName LIKE :firstName", { firstName: `%${filters.firstName}%` });
        })
      );
    }
  }

  setLastName(filters: TFilterAdmin) {
    if (filters.lastName) {
      this.query.andWhere(
        new Brackets((qb) => {
          qb.orWhere("admin.lastName LIKE :lastName", { lastName: `%${filters.lastName}%` });
          qb.orWhere("admin.firstName LIKE :lastName", { lastName: `%${filters.lastName}%` });
        })
      );
    }
  }

  setAdminType(filters: TFilterAdmin) {
    if (filters.notAdminType) {
      this.query.andWhere("admin.adminType NOT IN (:...notAdminType)", { notAdminType: filters.notAdminType });

      return;
    }

    if (filters.adminType) {
      this.query.andWhere("admin.adminType = :adminType", { adminType: filters.adminType });

      return;
    }

    if (filters.adminTypes) {
      this.query.andWhere("admin.adminType IN (:...adminTypes)", { adminTypes: filters.adminTypes });
    }
  }

  setEmail(filters: TFilterAdmin) {
    if (filters.email) {
      this.query.andWhere("admin.email = :email", { email: filters.email });
    }
  }
}
