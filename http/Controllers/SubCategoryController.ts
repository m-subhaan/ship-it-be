import SubCategoryValidation from "@validations/SubCategoryValidation";

import HttpResponse from "@appUtils/HttpResponse";

import { AddSubCategoryDto } from "@application/SubCategory/Dtos/AddSubCategoryDto";
import { UpdateSubCategoryDto } from "@application/SubCategory/Dtos/UpdateSubCategoryDto";
import { BulkUpsertSubCategoryDto } from "@application/SubCategory/Dtos/BulkUpsertSubCategoryDto";
import { RemoveSubCategoryDto } from "@application/SubCategory/Dtos/RemoveSubCategoryDto";

import { subCategoryService } from "@infrastructure/DIContainer/Resolver";

import ErrorLog from "@logger/ErrorLog";

import type { TRequest, TResponse } from "@typings/Express";

export class SubCategoryController {
  static async addSubCategory(request: TRequest, response: TResponse) {
    try {
      const { body } = request;
      SubCategoryValidation.addSubCategoryValidation(body);
      const addSubCategoryDto = AddSubCategoryDto.create(body);
      const httpResponse = await subCategoryService.addSubCategory(addSubCategoryDto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async updateSubCategory(request: TRequest, response: TResponse) {
    try {
      const { body, params } = request;
      SubCategoryValidation.updateSubCategoryValidation({ ...body, ...params });
      const updateSubCategoryDto = UpdateSubCategoryDto.create({ ...body, ...params });
      const httpResponse = await subCategoryService.updateSubCategory(updateSubCategoryDto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async bulkUpsertSubCategory(request: TRequest, response: TResponse) {
    try {
      const { body, params } = request;
      SubCategoryValidation.bulkUpsertSubCategoryValidation({ ...body, ...params });
      const bulkUpsertSubCategoryDto = BulkUpsertSubCategoryDto.create({ ...body, ...params });
      const httpResponse = await subCategoryService.bulkUpsertSubCategory(bulkUpsertSubCategoryDto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async removeSubCategory(request: TRequest, response: TResponse) {
    try {
      const { body, params } = request;
      SubCategoryValidation.removeSubCategoryValidation({ ...body, ...params });
      const removeSubCategoryDto = RemoveSubCategoryDto.create({ ...body, ...params });
      const httpResponse = await subCategoryService.removeSubCategory(removeSubCategoryDto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }
}
