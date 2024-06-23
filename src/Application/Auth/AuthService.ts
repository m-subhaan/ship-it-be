import { inject, injectable } from "tsyringe";

import { AdminEntity } from "@entities/Admin/AdminEntity";
import { MerchantEntity } from "@entities/Merchant/MerchantEntity";

import { APP_URLS } from "@appUtils/Constants";
import { HttpMessages, HttpStatus, HttpStatusCode } from "@appUtils/Http";
import HttpResponse from "@appUtils/HttpResponse";
import SharedUtils from "@appUtils/SharedUtils";

import AuthInfraService from "@infraServices/AuthInfraService";

import { emailUtils } from "@infrastructure/DIContainer/Resolver";
import AdminFilter from "@infrastructure/PostgresRepository/Shared/ORM/AdminFilter";

import ErrorLog from "@logger/ErrorLog";

import type ForgotPasswordDTO from "./DTOs/ForgotPasswordDTO";
import type LoginDTO from "./DTOs/LoginDTO";
import type ResetPasswordDTO from "./DTOs/ResetPasswordDTO";
import type { IAdminRepository } from "@entities/Admin/IAdminRepository";
import type { IMerchantRepository } from "@entities/Merchant/IMerchantRepository";
import { LOGIN_TYPES } from "@valueObjects/AuthValueObject";
import { MERCHANT_STATUS } from "@valueObjects/MerchantValueObject";

@injectable()
export class AuthService {
  constructor(
    @inject("IAdminRepository") private adminRepository: IAdminRepository,
    @inject("IMerchantRepository") private merchantRepository: IMerchantRepository
  ) { }

  async subMerchantLogin(email: string, password: string) {
    const merchant = await this.merchantRepository.fetch({ email, status: MERCHANT_STATUS.ACCEPTED });
    if (!merchant) {
      return HttpResponse.notAuthorized({ message: HttpMessages.INVALID_CREDS });
    }

    const merchantEntity = MerchantEntity.create(merchant);

    const comparePassword = await AuthInfraService.verifyUserCredentials(
      password,
      merchantEntity.password
    );
    if (!comparePassword) {
      return HttpResponse.create(HttpStatusCode.NOT_AUTHORIZED, {
        status: HttpStatus.ERROR,
        message: "Invalid Password"
      });
    }

    const token = AuthInfraService.authToken({ id: merchantEntity.merchantId, type: LOGIN_TYPES.MERCHANT });

    return HttpResponse.create(HttpStatusCode.OK, {
      status: HttpStatus.SUCCESS,
      token: token,
      merchant: MerchantEntity.publicFields(merchantEntity)
    });
  }

  async subAdminLogin(email: string, password: string) {
    const admin = await this.adminRepository.fetchByQuery({ email });
    if (!admin) {
      return HttpResponse.notAuthorized({ message: HttpMessages.INVALID_CREDS });
    }

    const adminEntity = AdminEntity.create(admin);

    const comparePassword = await AuthInfraService.verifyUserCredentials(
      password,
      adminEntity.password
    );
    if (!comparePassword) {
      return HttpResponse.create(HttpStatusCode.NOT_AUTHORIZED, {
        status: HttpStatus.ERROR,
        message: "Invalid Password"
      });
    }

    const token = AuthInfraService.authToken({ id: adminEntity.adminId, type: adminEntity.adminType });

    return HttpResponse.create(HttpStatusCode.OK, {
      status: HttpStatus.SUCCESS,
      token: token,
      admin: AdminEntity.publicFields(adminEntity)
    });
  }

  async login(loginDTO: LoginDTO, loginType?: string) {
    try {
      switch (loginType) {
        case LOGIN_TYPES.MERCHANT:
          return await this.subMerchantLogin(loginDTO.email, loginDTO.password);
        default:
          return await this.subAdminLogin(loginDTO.email, loginDTO.password);
      }
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async subMerchantForgotPassword(email: string) {
    const merchant = await this.merchantRepository.fetch({ email });
    if (!merchant) {
      return HttpResponse.notFound({ message: HttpMessages.INVALID_EMAIL });
    }

    const merchantEntity = MerchantEntity.create(merchant);

    merchantEntity.resetPasswordToken = SharedUtils.generateUuid();
    await this.merchantRepository.update({ merchantId: merchantEntity.merchantId }, merchantEntity);
    await emailUtils.merchantForgotPasswordEmail({
      merchant: merchantEntity,
      resetPasswordLink: APP_URLS.ADMIN_RESET_PASSWORD_URL
    });

    return HttpResponse.ok({ message: HttpMessages.RESET_TOKEN_SENT });
  }

  async subAdminForgotPassword(email: string) {
    const merchant = await this.merchantRepository.fetch({ email });
    if (!merchant) {
      return HttpResponse.notFound({ message: HttpMessages.INVALID_EMAIL });
    }

    const merchantEntity = MerchantEntity.create(merchant);

    merchantEntity.resetPasswordToken = SharedUtils.generateUuid();
    await this.merchantRepository.update({ merchantId: merchantEntity.merchantId }, merchantEntity);
    await emailUtils.merchantForgotPasswordEmail({
      merchant: merchantEntity,
      resetPasswordLink: APP_URLS.ADMIN_RESET_PASSWORD_URL
    });

    return HttpResponse.ok({ message: HttpMessages.RESET_TOKEN_SENT });
  }

  async forgotPassword(forgotPasswordDTO: ForgotPasswordDTO, loginType?: string) {
    try {
      switch (loginType) {
        case LOGIN_TYPES.MERCHANT:
          return await this.subMerchantForgotPassword(forgotPasswordDTO.email);
        default:
          return await this.subAdminForgotPassword(forgotPasswordDTO.email);
      }
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async subMerchantResetPassword(resetPasswordDTO: ResetPasswordDTO) {
    const merchant = await this.merchantRepository.fetch({ resetPasswordToken: resetPasswordDTO.resetPasswordToken });
    if (!merchant) {
      return HttpResponse.notFound({ message: HttpMessages.INVALID_RESET_TOKEN });
    }

    const merchantEntity = MerchantEntity.create(merchant);

    const comparePassword = await AuthInfraService.verifyUserCredentials(
      resetPasswordDTO.password,
      merchantEntity.password
    );
    if (comparePassword) {
      return HttpResponse.error({
        message: HttpMessages.DUPLICATE_PASSWORD
      });
    }

    merchantEntity.password = await AuthInfraService.encryptPassword(resetPasswordDTO.password);
    merchantEntity.resetPasswordToken = null as never;
    merchantEntity.passwordResetOn = SharedUtils.getCurrentDate({});
    await this.merchantRepository.update({ merchantId: merchantEntity.merchantId }, merchantEntity);

    return HttpResponse.ok({ message: HttpMessages.PASSWORD_RESET_SUCCESS });
  }

  async subAdminResetPassword(resetPasswordDTO: ResetPasswordDTO) {
    const searchFilters = AdminFilter.setFilter(resetPasswordDTO);
    const admin = await this.adminRepository.fetch(searchFilters);
    if (!admin) {
      return HttpResponse.notFound({ message: HttpMessages.INVALID_RESET_TOKEN });
    }

    const adminEntity = AdminEntity.create(admin);

    const comparePassword = await AuthInfraService.verifyUserCredentials(
      resetPasswordDTO.password,
      adminEntity.password
    );
    if (comparePassword) {
      return HttpResponse.error({
        message: HttpMessages.DUPLICATE_PASSWORD
      });
    }

    adminEntity.password = await AuthInfraService.encryptPassword(resetPasswordDTO.password);
    adminEntity.resetPasswordToken = null as never;
    adminEntity.passwordResetOn = SharedUtils.getCurrentDate({});
    await this.adminRepository.update({ adminId: adminEntity.adminId }, adminEntity);

    return HttpResponse.ok({ message: HttpMessages.PASSWORD_RESET_SUCCESS });
  }

  async resetPassword(resetPasswordDTO: ResetPasswordDTO, loginType?: string) {
    switch (loginType) {
      case LOGIN_TYPES.MERCHANT:
        return await this.subMerchantResetPassword(resetPasswordDTO);
      default:
        return await this.subAdminResetPassword(resetPasswordDTO);
    }
  }
}
