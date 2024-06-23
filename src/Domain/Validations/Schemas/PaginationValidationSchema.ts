import { z } from "zod";

const stringValidation = z.string().trim().min(1);
const PaginationValidationSchema = z
  .object({
    currentPage: stringValidation,
    perPage: stringValidation
  })
  .partial();

export default PaginationValidationSchema;
