import { z } from "zod";

import { ACCESS_ROLES } from "@valueObjects/AuthValueObject";

const stringValidation = z.string().trim().min(1, { message: "String required" });
const AdminValidationSchema = z
  .object({
    adminId: stringValidation,
    firstName: stringValidation,
    lastName: stringValidation,
    email: z.string().email(),
    password: stringValidation,
    resetPasswordToken: z.string(),
    passwordResetOn: z.string(),
    adminType: z.nativeEnum(ACCESS_ROLES),
    id: z.number().nonnegative({ message: "Invalid id" })
  })
  .partial();

export default AdminValidationSchema;
