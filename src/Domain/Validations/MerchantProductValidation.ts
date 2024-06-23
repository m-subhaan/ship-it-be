import { z } from "zod";

import MerchantProductValidationSchema from "@validations/Schemas/MerchantProductValidationSchema";
import MerchantVariantValidationSchema from "@validations/Schemas/MerchantVariantValidationSchema";
import PaginationValidationSchema from "@validations/Schemas/PaginationValidationSchema";

class MerchantProductValidation {
  static addMerchantProductValidation(body: unknown) {
    const addMerchantProduct = z.object({
      products: z.array(MerchantProductValidationSchema.required({
        title: true,
        description: true,
        productId: true,
        variants: true,
      })).min(1)
    });

    return addMerchantProduct.parse(body);
  }

  static getMerchantProductValidation(body: unknown) {
    const getMerchantProduct = MerchantProductValidationSchema.merge(PaginationValidationSchema)
      .partial({
        text: true,
        merchantProductId: true,
        merchantId: true,
        productId: true,
        currentPage: true,
        perPage: true
      });

    return getMerchantProduct.parse(body);
  }

  static updateMerchantProductValidation(body: unknown) {
    const updateMerchantProduct = MerchantProductValidationSchema.merge(z.object({
      variants: z.array(MerchantVariantValidationSchema.required({
        merchantVariantId: true,
        title: true,
        description: true,
        price: true
      })).min(1)
    })).required({
      merchantProductId: true,
      title: true,
      description: true,
      variants: true
    });

    return updateMerchantProduct.parse(body);
  }

  static removeMerchantProductValidation(body: unknown) {
    const removeMerchantProduct = MerchantProductValidationSchema.required({
      merchantProductId: true
    });

    return removeMerchantProduct.parse(body);
  }
}

export default MerchantProductValidation;
