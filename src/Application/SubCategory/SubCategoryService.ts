import async from "async";
import { inject, injectable } from "tsyringe";

import { SubCategoryEntity } from "@entities/SubCategory/SubCategoryEntity";

import HttpResponse from "@appUtils/HttpResponse";
import SharedUtils from "@appUtils/SharedUtils";

import { BaseService } from "@application/BaseService";

import ErrorLog from "@logger/ErrorLog";

import type { AddSubCategoryDto } from "./Dtos/AddSubCategoryDto";
import type { UpdateSubCategoryDto } from "./Dtos/UpdateSubCategoryDto";
import type { BulkUpsertSubCategoryDto } from "./Dtos/BulkUpsertSubCategoryDto";
import type { RemoveSubCategoryDto } from "./Dtos/RemoveSubCategoryDto";
import type { ISubCategoryRepository } from "@entities/SubCategory/ISubCategoryRepository";
import { SubCategory } from "@infrastructure/Database/Models/SubCategory";
import { ICategoryRepository } from "@entities/Category/ICategoryRepository";

@injectable()
export class SubCategoryService extends BaseService<SubCategory, SubCategoryEntity> {
  constructor(
    @inject("ISubCategoryRepository") private subCategoryRepository: ISubCategoryRepository,
    @inject("ICategoryRepository") private categoryRepository: ICategoryRepository,
  ) {
    super(subCategoryRepository);
  }

  async addSubCategory(addSubCategoryDto: AddSubCategoryDto) {
    try {
      const isCategory = await this.categoryRepository.fetch({ categoryId: addSubCategoryDto.categoryId });
      if (!isCategory) {
        return HttpResponse.notFound();
      }

      const isSubCategory = await this.subCategoryRepository.fetch({ subCategoryName: addSubCategoryDto.subCategoryName });
      if (isSubCategory) {
        return HttpResponse.conflict();
      }

      const subCategoryEntity = SubCategoryEntity.create(addSubCategoryDto);
      subCategoryEntity.subCategoryId = SharedUtils.shortUuid();

      await this.create(subCategoryEntity);

      return HttpResponse.created(subCategoryEntity);
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async updateSubCategory(updateSubCategoryDto: UpdateSubCategoryDto) {
    try {
      const searchFilters = { subCategoryId: updateSubCategoryDto.subCategoryId };

      const isSubCategory = await this.fetch(searchFilters);
      if (!isSubCategory) {
        return HttpResponse.notFound();
      }

      updateSubCategoryDto.subCategoryId = isSubCategory.subCategoryId;

      const subCategoryEntity = SubCategoryEntity.create({ ...isSubCategory, ...updateSubCategoryDto });
      await this.update({ subCategoryId: updateSubCategoryDto.subCategoryId }, subCategoryEntity);

      return HttpResponse.ok(subCategoryEntity);
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async bulkUpsertSubCategory(bulkUpsertSubCategoryDto: BulkUpsertSubCategoryDto) {
    try {
      const subCategoryEntities: SubCategoryEntity[] = [];
      await async.eachSeries(bulkUpsertSubCategoryDto.upsert, async (sc) => {
        const subCategoryEntity = SubCategoryEntity.create(sc);
        subCategoryEntity.subCategoryId = sc.subCategoryId ? sc.subCategoryId : SharedUtils.shortUuid();
        subCategoryEntity.categoryId = bulkUpsertSubCategoryDto.categoryId;

        await this.upsert({ subCategoryId: subCategoryEntity.subCategoryId }, subCategoryEntity);

        subCategoryEntities.push(SubCategoryEntity.create(subCategoryEntity));
      });

      return HttpResponse.ok(subCategoryEntities);
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async removeSubCategory(removeSubCategoryDto: RemoveSubCategoryDto) {
    try {
      const searchFilters = { subCategoryId: removeSubCategoryDto.subCategoryId };

      const isSubCategory = await this.fetch(searchFilters);
      if (!isSubCategory) {
        return HttpResponse.notFound();
      }

      await this.remove({
        subCategoryId: isSubCategory.subCategoryId
      });

      return HttpResponse.noContent();
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }
}
