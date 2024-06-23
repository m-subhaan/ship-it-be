import { z } from "zod";

import { IMAGE_VALIDATION } from "@valueObjects/RegexValueObject";
import { BOOLEAN_VALUES } from "@appUtils/Constants";

const stringValidation = z.string().trim().min(1, { message: "String required" });
const VariantValidationSchema = z
  .object({
    variantId: stringValidation,
    title: stringValidation,
    description: stringValidation,
    quantity: z.number(),
    price: z.number(),
    maxPrice: z.number(),
    sku: stringValidation,
    imageUrls: z.array(z.string().regex(IMAGE_VALIDATION)),
    isPromotion: z.boolean().or(z.nativeEnum(BOOLEAN_VALUES)),
    promotionValue: z.number(),
    isPublish: z.boolean().or(z.nativeEnum(BOOLEAN_VALUES)),
    optionName1: stringValidation,
    optionValue1: stringValidation,
    optionName2: stringValidation,
    optionValue2: stringValidation,
    optionValue3: stringValidation,
    optionName3: stringValidation,
    deletedUrls: z.array(stringValidation),
    productId: stringValidation,
  })
  .partial();

export default VariantValidationSchema;
