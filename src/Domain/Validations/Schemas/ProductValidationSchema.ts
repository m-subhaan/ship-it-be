import { z } from "zod";

import { IMAGE_VALIDATION } from "@valueObjects/RegexValueObject";
import { STATUS } from "@valueObjects/ProductValueObject";

import VariantValidationSchema from "./VariantValidationSchema";

const stringValidation = z.string().trim().min(1, { message: "String required" });
const ProductValidationSchema = z
  .object({
    productId: stringValidation,
    title: stringValidation,
    description: stringValidation,
    brand: stringValidation,
    vendor: stringValidation,
    status: z.nativeEnum(STATUS),
    imageUrl: z.string().regex(IMAGE_VALIDATION),
    categoryId: stringValidation,
    subCategoryId: stringValidation,
    text: stringValidation,
    variant: VariantValidationSchema.required({
      title: true,
      price: true,
      sku: true
    }).partial({
      maxPrice: true,
      description: true,
      imageUrl: true,
      isPromotion: true,
      promotionValue: true,
      isPublish: true,
      quantity: true,
      optionName1: true,
      optionValue1: true,
      optionName2: true,
      optionValue2: true,
      optionName3: true,
      optionValue3: true
    }),
  })
  .partial();

export default ProductValidationSchema;
