import VariantValidationSchema from "@validations/Schemas/VariantValidationSchema";

class VariantValidation {
  static addVariantValidation(body: unknown) {
    const addVariant = VariantValidationSchema.required({
      productId: true,
      title: true,
      price: true,
      sku: true
    }).partial({
      description: true,
      maxPrice: true,
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
    });

    return addVariant.parse(body);
  }

  static getVariantValidation(body: unknown) {
    const getVariant = VariantValidationSchema.partial({
      productId: true,
    });

    return getVariant.parse(body);
  }

  static updateVariantValidation(body: unknown) {
    const updateVariant = VariantValidationSchema.required({
      variantId: true,
      productId: true,
      title: true,
      price: true,
      sku: true,
    }).partial({
      description: true,
      imageUrl: true,
      isPromotion: true,
      promotionValue: true,
      maxPrice: true,
      isPublish: true,
      quantity: true,
      optionName1: true,
      optionValue1: true,
      optionName2: true,
      optionValue2: true,
      optionName3: true,
      optionValue3: true,
      deletedUrls: true,
    });

    return updateVariant.parse(body);
  }

  static removeVariantValidation(body: unknown) {
    const removeVariant = VariantValidationSchema.required({
      variantId: true
    });

    return removeVariant.parse(body);
  }
}

export default VariantValidation;
