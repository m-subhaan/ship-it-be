import SubCategoryValidationSchema from "@validations/Schemas/SubCategoryValidationSchema";

class SubCategoryValidation {
  static addSubCategoryValidation(body: unknown) {
    const addSubCategory = SubCategoryValidationSchema.required({
      subCategoryName: true,
      categoryId: true,
    });

    return addSubCategory.parse(body);
  }

  static updateSubCategoryValidation(body: unknown) {
    const updateSubCategory = SubCategoryValidationSchema.required({
      subCategoryId: true,
      subCategoryName: true,
    });

    return updateSubCategory.parse(body);
  }

  static bulkUpsertSubCategoryValidation(body: unknown) {
    const updateSubCategory = SubCategoryValidationSchema.required({
      categoryId: true,
      upsert: true,
    });

    return updateSubCategory.parse(body);
  }

  static removeSubCategoryValidation(body: unknown) {
    const removeSubCategory = SubCategoryValidationSchema.required({
      subCategoryId: true
    });

    return removeSubCategory.parse(body);
  }
}

export default SubCategoryValidation;
