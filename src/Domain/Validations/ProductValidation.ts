import ProductValidationSchema from "@validations/Schemas/ProductValidationSchema";
import VariantValidationSchema from "@validations/Schemas/VariantValidationSchema";
import PaginationValidationSchema from "@validations/Schemas/PaginationValidationSchema";

class ProductValidation {
  static addProductValidation(body: unknown) {
    const addProduct = ProductValidationSchema.required({
      title: true,
      status: true,
      categoryId: true,
      variants: true,
    }).partial({
      description: true,
      brand: true,
      vendor: true,
      imageUrl: true,
      subCategoryId: true,
    });

    return addProduct.parse(body);
  }

  static getProductValidation(body: unknown) {
    const getProduct = ProductValidationSchema.merge(PaginationValidationSchema)
    .merge(VariantValidationSchema)
      .partial({
        productId: true,
        status: true,
        categoryId: true,
        subCategoryId: true,
        isPromotion: true,
        isPublish: true,
        currentPage: true,
        perPage: true
      });

    return getProduct.parse(body);
  }

  static updateProductValidation(body: unknown) {
    const updateProduct = ProductValidationSchema.required({
      productId: true,
      title: true,
      status: true,
      categoryId: true,
    }).partial({
      description: true,
      brand: true,
      vendor: true,
      imageUrl: true,
      subCategoryId: true,
    });

    return updateProduct.parse(body);
  }

  static removeProductValidation(body: unknown) {
    const removeProduct = ProductValidationSchema.required({
      productId: true
    });

    return removeProduct.parse(body);
  }
}

export default ProductValidation;
