import type { TNext, TRequest, TResponse } from "@typings/Express";

import { AdminEntity } from "@entities/Admin/AdminEntity";
import { MerchantEntity } from "@entities/Merchant/MerchantEntity";

import HttpResponse from "@appUtils/HttpResponse";
import { HttpMessages } from "@appUtils/Http";

import AuthInfraService from "@infraServices/AuthInfraService";

import { adminRepository } from "@infrastructure/DIContainer/Resolver";
import { merchantRepository } from "@infrastructure/DIContainer/Resolver";

import ErrorLog from "@logger/ErrorLog";
import { LOGIN_TYPES } from "@valueObjects/AuthValueObject";

type TDecodedToken = { id: string; type: string; iat: number };

export const AuthMiddleware = async (request: TRequest, response: TResponse, next: TNext) => {
  try {
    const token = request.header("authorization");
    if (!token) {
      return HttpResponse.convertToExpress(
        response,
        HttpResponse.notAuthorized({
          message: HttpMessages.INVALID_CREDS
        })
      );
    }
    const decoded = AuthInfraService.verifyToken(token) as never as TDecodedToken;

    const isAuthorized = AuthInfraService.hasAccessToResource(decoded.type, request);
    if (!isAuthorized) {
      return HttpResponse.convertToExpress(response, HttpResponse.forbidden({ message: HttpMessages.FORBIDDEN }));
    }

    if (decoded.type === LOGIN_TYPES.MERCHANT) {
      const merchant = await merchantRepository.fetch({ merchantId: decoded.id });
      if (!merchant) {
        return HttpResponse.convertToExpress(
          response,
          HttpResponse.notAuthorized({ message: HttpMessages.INVALID_CREDS })
        );
      }

      const merchantEntity = MerchantEntity.create(merchant);
      request.merchant = merchantEntity;
    } else {
      const admin = await adminRepository.fetch({ adminId: decoded.id });
      if (!admin) {
        return HttpResponse.convertToExpress(
          response,
          HttpResponse.notAuthorized({ message: HttpMessages.INVALID_CREDS })
        );
      }

      const adminEntity = AdminEntity.create(admin);
      request.admin = adminEntity;
    }

    return next();
  } catch (error: unknown) {
    return HttpResponse.convertToExpress(response, HttpResponse.error({ message: ErrorLog(error as Error) }));
  }
};
