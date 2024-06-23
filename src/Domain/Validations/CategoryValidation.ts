import CategoryValidationSchema from "@validations/Schemas/CategoryValidationSchema";

class CategoryValidation {
  static addCategoryValidation(body: unknown) {
    const addCategory = CategoryValidationSchema.required({
      categoryName: true,
    }).partial({
      subCategoryName: true,
    });

    return addCategory.parse(body);
  }

  static getCategoryValidation(body: unknown) {
    const getCategory = CategoryValidationSchema.partial({
      categoryName: true,
      isSubCategory: true,
    });

    return getCategory.parse(body);
  }

  static updateCategory(body: unknown) {
    const updateCategory = CategoryValidationSchema.required({
      categoryId: true,
      categoryName: true
    });

    return updateCategory.parse(body);
  }

  static removeCategoryValidation(body: unknown) {
    const removeCategory = CategoryValidationSchema.required({
      categoryId: true
    });

    return removeCategory.parse(body);
  }
}

export default CategoryValidation;
