import { inject, injectable } from "tsyringe";

import { AdminEntity } from "@entities/Admin/AdminEntity";

import { APP_URLS } from "@appUtils/Constants";
import HttpResponse from "@appUtils/HttpResponse";
import SharedUtils from "@appUtils/SharedUtils";

import { BaseService } from "@application/BaseService";

import AdminFilter from "@infrastructure/PostgresRepository/Shared/ORM/AdminFilter";

import { emailUtils } from "@infrastructure/DIContainer/Resolver";

import ErrorLog from "@logger/ErrorLog";

import type { AddAdminDto } from "./Dtos/AddAdminDto";
import type { GetAdminDto } from "./Dtos/GetAdminDto";
import type { RemoveAdminDto } from "./Dtos/RemoveAdminDto";
import type { UpdateAdminDto } from "./Dtos/UpdateAdminDto";
import type { IAdminRepository } from "@entities/Admin/IAdminRepository";
import type { Admin } from "@infrastructure/Database/Models/Admin";
import type PaginationOptions from "@infraUtils/PaginationOptions";
import type { TFilterAdmin } from "@infrastructure/PostgresRepository/Shared/Query/AdminQueryBuilder";

@injectable()
export class AdminService extends BaseService<Admin, AdminEntity> {
  constructor(@inject("IAdminRepository") private adminRepository: IAdminRepository) {
    super(adminRepository);
  }
  async fetchByQuery(searchFilters: TFilterAdmin) {
    return await this.adminRepository.fetchByQuery(searchFilters);
  }

  async fetchAllByQuery(searchFilters: TFilterAdmin) {
    return await this.adminRepository.fetchAllByQuery(searchFilters);
  }

  async fetchBySearchQuery(searchFilters: TFilterAdmin) {
    return await this.adminRepository.fetchBySearchQuery(searchFilters);
  }

  async fetchPaginatedByQuery(searchFilters: TFilterAdmin, pagination: PaginationOptions) {
    return await this.adminRepository.fetchPaginatedByQuery(searchFilters, pagination);
  }

  async subAddAdmin(addAdminDto: AddAdminDto) {
    const searchFilters = AdminFilter.setFilter({ email: addAdminDto.email });
    const isAdmin = await this.fetch(searchFilters);
    if (isAdmin) {
      return false;
    }

    const isDeletedAdmin = await this.fetchWithDeleted(searchFilters);
    if (isDeletedAdmin) {
      await this.restore({ adminId: isDeletedAdmin.adminId });
    }

    const adminEntity = AdminEntity.create(addAdminDto);
    adminEntity.adminId = isDeletedAdmin ? isDeletedAdmin.adminId : SharedUtils.shortUuid();
    adminEntity.resetPasswordToken = SharedUtils.generateUuid();
    await this.upsert({ email: adminEntity.email }, adminEntity);

    await emailUtils.adminRegistrationEmail({
      admin: adminEntity,
      resetPasswordLink: APP_URLS.ADMIN_RESET_PASSWORD_URL
    });

    const addedAdmin = await this.fetchByQuery({ adminId: adminEntity.adminId });

    if (!addedAdmin) {
      return false;
    }

    const addedAdminEntity = AdminEntity.publicFields(addedAdmin);

    return addedAdminEntity;
  }

  async addAdmin(addAdminDto: AddAdminDto) {
    try {
      const adminEntity = await this.subAddAdmin(addAdminDto);
      if (!adminEntity) {
        return HttpResponse.conflict();
      }

      return HttpResponse.created(adminEntity);
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async getAdmins(getAdminDto: GetAdminDto) {
    try {
      const admins = await this.fetchAllByQuery({ ...getAdminDto });
      if (!admins) {
        return HttpResponse.notFound();
      }

      const adminEntities = admins.map((admin) => {
        return {
          ...AdminEntity.publicFields(admin)
        };
      });

      return HttpResponse.ok(adminEntities);
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async updateAdmin(updateAdminDto: UpdateAdminDto) {
    try {
      const searchFilters = updateAdminDto.adminId
        ? { adminId: updateAdminDto.adminId }
        : { id: updateAdminDto.id as number };

      const isAdmin = await this.fetch(searchFilters);
      if (!isAdmin) {
        return HttpResponse.notFound();
      }

      updateAdminDto.adminId = isAdmin.adminId;

      const adminEntity = AdminEntity.create({ ...isAdmin, ...updateAdminDto });
      await this.update({ adminId: updateAdminDto.adminId }, adminEntity);

      const updatedAdmin = await this.fetchByQuery({ adminId: updateAdminDto.adminId });
      if (!updatedAdmin) {
        return false;
      }

      const updatedAdminEntity = AdminEntity.publicFields(updatedAdmin);

      return HttpResponse.ok(updatedAdminEntity);
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async removeAdmin(removeAdminDto: RemoveAdminDto) {
    try {
      const searchFilters = removeAdminDto.adminId
        ? { adminId: removeAdminDto.adminId as string }
        : { id: removeAdminDto.id as number };

      const isAdmin = await this.fetch(searchFilters);

      if (!isAdmin) {
        return HttpResponse.notFound();
      }

      await this.remove({
        adminId: isAdmin.adminId
      });

      return HttpResponse.noContent();
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }
}
