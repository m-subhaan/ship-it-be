import { z } from "zod";

import { MERCHANT_STATUS } from "@valueObjects/MerchantValueObject";

const stringValidation = z.string().trim().min(1, { message: "String required" });
export const MerchantValidationSchema = z
  .object({
    merchantId: stringValidation,
    name: stringValidation,
    email: z.string().email(),
    password: stringValidation,
    resetPasswordToken: z.string(),
    passwordResetOn: z.string(),
    mobileNumber: stringValidation,
    cnic: stringValidation,
    address: stringValidation,
    idFrontImage: stringValidation,
    idBackImage: stringValidation,
    bankName: stringValidation,
    bankAccountTitle: stringValidation,
    bankAccountNumber: stringValidation,
    status: z.nativeEnum(MERCHANT_STATUS),
    text: stringValidation,
  })
  .partial();
