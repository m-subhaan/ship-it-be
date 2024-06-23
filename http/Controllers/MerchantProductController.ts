import MerchantProductValidation from "@validations/MerchantProductValidation";

import HttpResponse from "@appUtils/HttpResponse";

import { AddMerchantProductDto } from "@application/MerchantProduct/Dtos/AddMerchantProductDto";
import { GetMerchantProductDto } from "@application/MerchantProduct/Dtos/GetMerchantProductDto";
import { UpdateMerchantProductDto } from "@application/MerchantProduct/Dtos/UpdateMerchantProductDto";
import { RemoveMerchantProductDto } from "@application/MerchantProduct/Dtos/RemoveMerchantProductDto";

import {PaginationDTO} from "@infraUtils/PaginationDTO";

import { merchantProductService } from "@infrastructure/DIContainer/Resolver";

import ErrorLog from "@logger/ErrorLog";

import type { TRequest, TResponse } from "@typings/Express";

export class MerchantProductController {
static async addMerchantProduct(request: TRequest, response: TResponse) {
    try {
      const { body, merchant } = request;
      MerchantProductValidation.addMerchantProductValidation(body);
      const dto = AddMerchantProductDto.create({ ...body, ...merchant });
      const httpResponse = await merchantProductService.addMerchantProduct(dto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async getMerchantProducts(request: TRequest, response: TResponse) {
    try {
      const { query, merchant } = request;
      MerchantProductValidation.getMerchantProductValidation({ ...query });
      const paginationDTO = PaginationDTO.create(query as unknown as PaginationDTO);
      const dto = GetMerchantProductDto.create({ ...query, ...merchant });
      const httpResponse = await merchantProductService.getMerchantProducts(dto, paginationDTO);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async updateMerchantProduct(request: TRequest, response: TResponse) {
    try {
      const { body, params, merchant } = request;
      MerchantProductValidation.updateMerchantProductValidation({ ...body, ...params });
      const dto = UpdateMerchantProductDto.create({ ...body, ...params, ...merchant });
      const httpResponse = await merchantProductService.updateMerchantProduct(dto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async removeMerchantProduct(request: TRequest, response: TResponse) {
    try {
      const { body, params, merchant } = request;
      MerchantProductValidation.removeMerchantProductValidation({ ...body, ...params });
      const dto = RemoveMerchantProductDto.create({ ...body, ...params, ...merchant });
      const httpResponse = await merchantProductService.removeMerchantProduct(dto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }
}
