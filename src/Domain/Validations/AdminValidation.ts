import AdminValidationSchema from "@validations/Schemas/AdminValidationSchema";


class AdminValidation {
  static addAdminValidation(body: unknown) {
    const addAdmin = AdminValidationSchema.required({
      firstName: true,
      lastName: true,
      email: true,
      adminType: true
    });

    return addAdmin.parse(body);
  }

  static getAdminValidation(body: unknown) {
    const getAdmin = AdminValidationSchema.partial({
      firstName: true,
      lastName: true,
      email: true,
      adminType: true,
    });

    return getAdmin.parse(body);
  }

  static updateAdminValidation(body: unknown) {
    const updateAdmin = AdminValidationSchema.partial({
      adminId: true,
      firstName: true,
      lastName: true,
      email: true,
      adminType: true
    });

    return updateAdmin.parse(body);
  }

  static removeAdminValidation(body: unknown) {
    const removeAdmin = AdminValidationSchema.required({
      adminId: true
    });

    return removeAdmin.parse(body);
  }
}

export default AdminValidation;
