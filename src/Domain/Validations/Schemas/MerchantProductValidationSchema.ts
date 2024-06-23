import { z } from "zod";

import MerchantVariantValidationSchema from "./MerchantVariantValidationSchema";

const stringValidation = z.string().trim().min(1, { message: "String required" });
const MerchantProductValidationSchema = z
  .object({
    merchantProductId: stringValidation,
    title: stringValidation,
    description: stringValidation,
    productId: stringValidation,
    merchantId: stringValidation,
    text: stringValidation,
    variants: z.array(MerchantVariantValidationSchema.required({
      variantId: true,
      title: true,
      description: true,
      price: true
    })).min(1)
  })
  .partial();

export default MerchantProductValidationSchema;
