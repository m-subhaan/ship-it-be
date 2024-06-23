import z from "zod";

import { MerchantValidationSchema } from "./Schemas/MerchantValidationSchema";

const stringValidation = z.string().trim().min(1, { message: "String required" });
export class MerchantValidation {
  static addMerchantValidation(body: unknown) {
    const row = MerchantValidationSchema.required({
      name: true,
      email: true,
      mobileNumber: true,
      address: true
    });

    return row.parse(body);
  }

  static updateMerchantValidation(body: unknown) {
    const row = MerchantValidationSchema.merge(
      z.object({ images: z.object({ idFrontImage: stringValidation, idBackImage: stringValidation }) })
    )
      .partial({
        name: true,
        email: true,
        mobileNumber: true,
        cnic: true,
        address: true,
        images: true,
        bankName: true,
        bankAccountTitle: true,
        bankAccountNumber: true
      })
      .required({ merchantId: true });

    return row.parse(body);
  }

  static getMerchantValidation(body: unknown) {
    const row = MerchantValidationSchema.partial({
      text: true,
      status: true
    });

    return row.parse(body);
  }

  static updateMerchantStatusValidation(body: unknown) {
    const row = MerchantValidationSchema.required({
      merchantId: true,
      status: true
    });

    return row.parse(body);
  }
}
