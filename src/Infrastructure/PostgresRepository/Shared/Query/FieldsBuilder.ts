const adminFields = [
  "admin.id AS idAdmin",
  "admin.adminId AS adminId",
  "admin.adminType AS adminType",
  "admin.firstName AS firstName",
  "admin.lastName AS lastName",
  "admin.email AS email",
  "admin.password AS password",
  "admin.resetPasswordToken AS resetPasswordToken",
  "admin.passwordResetOn AS passwordResetOn",
];

const categoryFields = [
  "category.categoryId AS categoryId",
  "category.categoryName AS categoryName",
];

const subCategoryFields = [
  "subCategory.subCategoryId AS subCategoryId",
  "subCategory.subCategoryName AS subCategoryName",
];



export const SEARCH_ADMIN_REPOSITORY_FIELDS = [...adminFields];
export const SEARCH_CATEGORY_REPOSITORY_FIELDS = [...categoryFields, ...subCategoryFields];
