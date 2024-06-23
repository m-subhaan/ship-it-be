import { z } from "zod";

import { BOOLEAN_VALUES } from "@appUtils/Constants";

const stringValidation = z.string().trim().min(1, { message: "String required" });
const CategoryValidationSchema = z
  .object({
    categoryId: stringValidation,
    categoryName: stringValidation,
    subCategoryName: z.array(stringValidation),
    isSubCategory: z.boolean().or(z.nativeEnum(BOOLEAN_VALUES))
  })
  .partial();

export default CategoryValidationSchema;
