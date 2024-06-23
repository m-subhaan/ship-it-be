import { z } from "zod";

const stringValidation = z.string().trim().min(1, { message: "String required" });
const SubCategoryValidationSchema = z
  .object({
    subCategoryId: stringValidation,
    subCategoryName: stringValidation,
    categoryId: stringValidation,
    upsert: z.array(z.object({
      subCategoryId: stringValidation,
      subCategoryName: stringValidation,
    }).required({
      subCategoryName: true
    }).partial({
      subCategoryId: true
    })).min(1)
  })
  .partial();

export default SubCategoryValidationSchema;
