import { MerchantValidation } from "@validations/MerchantValidation";

import HttpResponse from "@appUtils/HttpResponse";

import { AddMerchantDto } from "@application/Merchant/Dtos/AddMerchantDto";
import { UpdateMerchantDto } from "@application/Merchant/Dtos/UpdateMerchantDto";
import { GetMerchantDto } from "@application/Merchant/Dtos/GetMerchantDto";
import { UpdateMerchantStatusDto } from "@application/Merchant/Dtos/UpdateMerchantStatusDto";

import { merchantService } from "@infrastructure/DIContainer/Resolver";

import ErrorLog from "@logger/ErrorLog";

import type { TRequest, TResponse } from "@typings/Express";

export class MerchantController {
  static async addMerchant(request: TRequest, response: TResponse) {
    try {
      const { body } = request;
      MerchantValidation.addMerchantValidation(body);
      const dto = AddMerchantDto.create(body);
      const httpResponse = await merchantService.addMerchant(dto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async updateMerchant(request: TRequest, response: TResponse) {
    try {
      const { body, params } = request;
      MerchantValidation.updateMerchantValidation({ ...body, ...params });
      const dto = UpdateMerchantDto.create({ ...body, ...params });
      const httpResponse = await merchantService.updateMerchant(dto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async getMerchants(request: TRequest, response: TResponse) {
    try {
      const { query } = request;
      MerchantValidation.getMerchantValidation({ ...query });
      const dto = GetMerchantDto.create({ ...query });
      const httpResponse = await merchantService.getMerchants(dto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async updateMerchantStatus(request: TRequest, response: TResponse) {
    try {
      const { body, params } = request;
      MerchantValidation.updateMerchantStatusValidation({ ...body, ...params });
      const dto = UpdateMerchantStatusDto.create({ ...body, ...params });
      const httpResponse = await merchantService.updateMerchantStatus(dto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }
}
