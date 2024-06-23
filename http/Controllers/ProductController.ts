import ProductValidation from "@validations/ProductValidation";

import HttpResponse from "@appUtils/HttpResponse";

import { AddProductDto } from "@application/Product/Dtos/AddProductDto";
import { GetProductDto } from "@application/Product/Dtos/GetProductDto";
import { UpdateProductDto } from "@application/Product/Dtos/UpdateProductDto";
import { RemoveProductDto } from "@application/Product/Dtos/RemoveProductDto";

import {PaginationDTO} from "@infraUtils/PaginationDTO";

import { productService } from "@infrastructure/DIContainer/Resolver";

import ErrorLog from "@logger/ErrorLog";

import type { TRequest, TResponse } from "@typings/Express";

export class ProductController {
  static async addProduct(request: TRequest, response: TResponse) {
    try {
      const { body } = request;
      ProductValidation.addProductValidation(body);
      const addProductDto = AddProductDto.create(body);
      const httpResponse = await productService.addProduct(addProductDto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async getProducts(request: TRequest, response: TResponse) {
    try {
      const { query } = request;
      ProductValidation.getProductValidation({ ...query });
      const paginationDTO = PaginationDTO.create(query as unknown as PaginationDTO);
      const getProductDto = GetProductDto.create({ ...query });
      const httpResponse = await productService.getProducts(getProductDto, paginationDTO);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async updateProduct(request: TRequest, response: TResponse) {
    try {
      const { body, params } = request;
      ProductValidation.updateProductValidation({ ...body, ...params });
      const updateProductDto = UpdateProductDto.create({ ...body, ...params });
      const httpResponse = await productService.updateProduct(updateProductDto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }

  static async removeProduct(request: TRequest, response: TResponse) {
    try {
      const { body, params } = request;
      ProductValidation.removeProductValidation({ ...body, ...params });
      const removeProductDto = RemoveProductDto.create({ ...body, ...params });
      const httpResponse = await productService.removeProduct(removeProductDto);

      return HttpResponse.convertToExpress(response, httpResponse);
    } catch (error) {
      return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error) }));
    }
  }
}
