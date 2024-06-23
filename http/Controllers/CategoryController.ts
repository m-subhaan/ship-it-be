import CategoryValidation from "@validations/CategoryValidation";

import HttpResponse from "@appUtils/HttpResponse";

import { AddCategoryDto } from "@application/Category/Dtos/AddCategoryDto";
import { GetCategoryDto } from "@application/Category/Dtos/GetCategoryDto";
import { UpdateCategoryDto } from "@application/Category/Dtos/UpdateCategoryDto";
import { RemoveCategoryDto } from "@application/Category/Dtos/RemoveCategoryDto";

import { categoryService } from "@infrastructure/DIContainer/Resolver";

import ErrorLog from "@logger/ErrorLog";

import type { TRequest, TResponse } from "@typings/Express";

export class CategoryController {
  static async addCategory(request: TRequest, response: TResponse) {
    try {
      const { body } = request;
      CategoryValidation.addCategoryValidation(body);
      const addCategoryDto = AddCategoryDto.create(body);
      const httpResponse = await categoryService.addCategory(addCategoryDto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async getCategories(request: TRequest, response: TResponse) {
    try {
      const { query } = request;
      CategoryValidation.getCategoryValidation({ ...query });
      const getCategoryDto = GetCategoryDto.create({ ...query });
      const httpResponse = await categoryService.getCategories(getCategoryDto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async updateCategory(request: TRequest, response: TResponse) {
    try {
      const { body, params } = request;
      CategoryValidation.updateCategory({ ...body, ...params });
      const updateCategoryDto = UpdateCategoryDto.create({ ...body, ...params });
      const httpResponse = await categoryService.updateCategory(updateCategoryDto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async removeCategory(request: TRequest, response: TResponse) {
    try {
      const { body, params } = request;
      CategoryValidation.removeCategoryValidation({ ...body, ...params });
      const removeCategoryDto = RemoveCategoryDto.create({ ...body, ...params });
      const httpResponse = await categoryService.removeCategory(removeCategoryDto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }
}
