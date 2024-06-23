import { z } from "zod";

const stringValidation = z.string().trim().min(1);
const AuthValidationSchema = z
  .object({
    email: z.string().email(),
    password: stringValidation,
    confirmPassword: stringValidation,
    resetPasswordToken: z.string()
  })
  .partial();

export default AuthValidationSchema;
