import VariantValidation from "@validations/VariantValidation";

import HttpResponse from "@appUtils/HttpResponse";

import { AddVariantDto } from "@application/Variant/Dtos/AddVariantDto";
import { GetVariantDto } from "@application/Variant/Dtos/GetVariantDto";
import { UpdateVariantDto } from "@application/Variant/Dtos/UpdateVariantDto";
import { RemoveVariantDto } from "@application/Variant/Dtos/RemoveVariantDto";

import { variantService } from "@infrastructure/DIContainer/Resolver";

import ErrorLog from "@logger/ErrorLog";

import type { TRequest, TResponse } from "@typings/Express";

export class VariantController {
  static async addVariant(request: TRequest, response: TResponse) {
    try {
      const { body } = request;
      VariantValidation.addVariantValidation(body);
      const addVariantDto = AddVariantDto.create(body);
      const httpResponse = await variantService.addVariant(addVariantDto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async getVariants(request: TRequest, response: TResponse) {
    try {
      const { params } = request;
      VariantValidation.getVariantValidation({ ...params });
      const getVariantDto = GetVariantDto.create({ ...params });
      const httpResponse = await variantService.getVariants(getVariantDto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async updateVariant(request: TRequest, response: TResponse) {
    try {
      const { body, params } = request;
      VariantValidation.updateVariantValidation({ ...body, ...params });
      const updateVariantDto = UpdateVariantDto.create({ ...body, ...params });
      const httpResponse = await variantService.updateVariant(updateVariantDto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async removeVariant(request: TRequest, response: TResponse) {
    try {
      const { body, params } = request;
      VariantValidation.removeVariantValidation({ ...body, ...params });
      const removeVariantDto = RemoveVariantDto.create({ ...body, ...params });
      const httpResponse = await variantService.removeVariant(removeVariantDto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }
}
