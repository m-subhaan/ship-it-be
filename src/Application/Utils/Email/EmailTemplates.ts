import { EMAIL_TYPES } from "@appUtils/Constants";

import type { TEmailType } from "@src/typings/EmailClient";

type TEmailTemplate = {
  subject: string;
  body: string;
  emailType: TEmailType;
};

const EMAIL_FOOTER = "<br><br>Sincerely,<br>Ship It<br>";

export const adminRegistrationTemplate = (
  firstName: string,
  resetPasswordLink: string,
  resetPasswordToken: string
): TEmailTemplate => {
  return {
    subject: "Ship It App - Set Password",
    body: `Hi ${firstName},<br><br>You've been invited to use the Ship It App. Please click <a clicktracking=off href="${resetPasswordLink}?userId=${resetPasswordToken}">here</a> to set your password.${EMAIL_FOOTER}`,
    emailType: EMAIL_TYPES.HTML
  };
};

export const forgotPasswordTemplate = (
  resetPasswordLink: string,
  resetPasswordToken: string,
  firstName: string
): TEmailTemplate => {
  return {
    subject: "Ship It App - Reset Password",
    body: `Hi ${firstName},<br><br>Please click <a clicktracking="off" href="${resetPasswordLink}?userId=${resetPasswordToken}">here</a> to reset your password.${EMAIL_FOOTER}`,
    emailType: EMAIL_TYPES.HTML
  };
};

export const merchantRegistrationTemplate = (
  name: string,
  resetPasswordLink: string,
  resetPasswordToken: string
): TEmailTemplate => {
  return {
    subject: "Welcome to Ship It",
    body: `Hi ${name},<br><br>Your request has been approved. Please click <a clicktracking=off href="${resetPasswordLink}?userId=${resetPasswordToken}">here</a> to set your password.${EMAIL_FOOTER}`,
    emailType: EMAIL_TYPES.HTML
  };
};
