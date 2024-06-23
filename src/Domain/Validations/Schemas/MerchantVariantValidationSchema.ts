import { z } from "zod";

const stringValidation = z.string().trim().min(1, { message: "String required" });
const MerchantVariantValidationSchema = z
  .object({
    merchantVariantId: stringValidation,
    title: stringValidation,
    description: stringValidation,
    price: z.number(),
    merchantProductId: stringValidation,
    variantId: stringValidation,
  })
  .partial();

export default MerchantVariantValidationSchema;
