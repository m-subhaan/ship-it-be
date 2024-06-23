import { inject, injectable } from "tsyringe";

import { CategoryEntity } from "@entities/Category/CategoryEntity";
import { SubCategoryEntity } from "@entities/SubCategory/SubCategoryEntity";

import HttpResponse from "@appUtils/HttpResponse";
import SharedUtils from "@appUtils/SharedUtils";

import { BaseService } from "@application/BaseService";

import CategoryFilter from "@repositories/Shared/ORM/CategoryFilter";

import ErrorLog from "@logger/ErrorLog";

import type { AddCategoryDto } from "./Dtos/AddCategoryDto";
import type { GetCategoryDto } from "./Dtos/GetCategoryDto";
import type { UpdateCategoryDto } from "./Dtos/UpdateCategoryDto";
import type { RemoveCategoryDto } from "./Dtos/RemoveCategoryDto";
import type { ICategoryRepository } from "@entities/Category/ICategoryRepository";
import type { ISubCategoryRepository } from "@entities/SubCategory/ISubCategoryRepository";
import type { Category } from "@infrastructure/Database/Models/Category";

@injectable()
export class CategoryService extends BaseService<Category, CategoryEntity> {
  constructor(
    @inject("ICategoryRepository") private categoryRepository: ICategoryRepository,
    @inject("ISubCategoryRepository") private subCategoryRepository: ISubCategoryRepository
  ) {
    super(categoryRepository);
  }

  async addCategory(addCategoryDto: AddCategoryDto) {
    try {
      const isCategory = await this.fetch({ categoryName: addCategoryDto.categoryName });

      if (isCategory) {
        return HttpResponse.conflict();
      }

      const categoryEntity = CategoryEntity.create(addCategoryDto);
      categoryEntity.categoryId = SharedUtils.shortUuid();

      const subCategoryEntities = addCategoryDto.subCategoryName?.map(sc => {
        const subCategoryEntity = SubCategoryEntity.create({ subCategoryName: sc });
        subCategoryEntity.subCategoryId = SharedUtils.shortUuid();
        subCategoryEntity.categoryId = categoryEntity.categoryId;

        return subCategoryEntity;
      }) || [];

      await this.create(categoryEntity);

      if (addCategoryDto.subCategoryName?.length) {
        await this.subCategoryRepository.bulkInsert(subCategoryEntities);
      }

      return HttpResponse.created({
        ...categoryEntity,
        subcategory: subCategoryEntities.map(sc => SubCategoryEntity.create(sc))
      });
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async getCategories(getCategoryDto: GetCategoryDto) {
    try {
      const searchFilters = CategoryFilter.setFilter(getCategoryDto);
      const categories = await this.categoryRepository.fetchAllWithRelation(
        searchFilters,
        { categoryName: "ASC" },
        getCategoryDto.isSubCategory ? ["subCategory"] : []
      );

      if (!categories) {
        return HttpResponse.notFound();
      }

      const categoryEntities = categories.map((c) => {
        return {
          ...CategoryEntity.create(c),
          subCategory: c.subCategory?.map(sc => SubCategoryEntity.create(sc))
        };
      });

      return HttpResponse.ok(categoryEntities);
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    try {
      const searchFilters = { categoryId: updateCategoryDto.categoryId };

      const isCategory = await this.fetch(searchFilters);
      if (!isCategory) {
        return HttpResponse.notFound();
      }

      updateCategoryDto.categoryId = isCategory.categoryId;

      const categoryEntity = CategoryEntity.create({ ...isCategory, ...updateCategoryDto });
      await this.update({ categoryId: updateCategoryDto.categoryId }, categoryEntity);

      return HttpResponse.ok(categoryEntity);
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async removeCategory(removeCategoryDto: RemoveCategoryDto) {
    try {
      const searchFilters = { categoryId: removeCategoryDto.categoryId };

      const isCategory = await this.fetch(searchFilters);

      if (!isCategory) {
        return HttpResponse.notFound();
      }

      await this.remove({
        categoryId: isCategory.categoryId
      });

      return HttpResponse.noContent();
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }
}
