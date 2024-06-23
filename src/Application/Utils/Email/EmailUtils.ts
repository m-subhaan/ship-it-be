import { inject, injectable } from "tsyringe";

import * as EmailTemplates from "@appUtils/Email/EmailTemplates";

import ErrorLog from "@logger/ErrorLog";

import type { AdminEntity } from "@entities/Admin/AdminEntity";
import type { MerchantEntity } from "@entities/Merchant/MerchantEntity";
import type { IEmailClient } from "@infraServices/ThirdPartyClient/Email/IEmailClient";

@injectable()
export class EmailUtils {
  constructor(@inject("IEmailClient") private emailClient: IEmailClient) { }

  async adminRegistrationEmail(params: { admin: AdminEntity; resetPasswordLink: string}) {
    try {
      const { email, firstName, resetPasswordToken } = params.admin;
      const { subject, body, emailType } = EmailTemplates.adminRegistrationTemplate(
        firstName,
        params.resetPasswordLink,
        resetPasswordToken
      );

      return await this.emailClient.sendEmailWithoutAttachment(subject, body, email, emailType);
    } catch (error) {
      return ErrorLog(error);
    }
  }

  async forgotPasswordEmail(params: { admin: AdminEntity; resetPasswordLink: string}) {
    try {
      const { email, resetPasswordToken, firstName } = params.admin;
      const { subject, body, emailType } = EmailTemplates.forgotPasswordTemplate(
        params.resetPasswordLink,
        resetPasswordToken,
        firstName
      );

      return await this.emailClient.sendEmailWithoutAttachment(subject, body, email, emailType);
    } catch (error) {
      return ErrorLog(error);
    }
  }

  async merchantRegistrationEmail(params: { merchant: MerchantEntity; resetPasswordLink: string}) {
    try {
      const { email, name, resetPasswordToken } = params.merchant;
      const { subject, body, emailType } = EmailTemplates.merchantRegistrationTemplate(
        name,
        params.resetPasswordLink,
        resetPasswordToken
      );

      return await this.emailClient.sendEmailWithoutAttachment(subject, body, email, emailType);
    } catch (error) {
      return ErrorLog(error);
    }
  }

  async merchantForgotPasswordEmail(params: { merchant: MerchantEntity; resetPasswordLink: string}) {
    try {
      const { email, resetPasswordToken, name } = params.merchant;
      const { subject, body, emailType } = EmailTemplates.forgotPasswordTemplate(
        params.resetPasswordLink,
        resetPasswordToken,
        name
      );

      return await this.emailClient.sendEmailWithoutAttachment(subject, body, email, emailType);
    } catch (error) {
      return ErrorLog(error);
    }
  }
}
