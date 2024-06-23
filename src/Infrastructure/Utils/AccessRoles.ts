export const ACCESS_ROLES = {
  SUPER_ADMIN: {
    POST: [
      "admin/add",
      "category/add",
      "subCategory/add",
      "product/add",
      "variant/add",
    ],
    GET: [
      "admin/search",
      "category/search",
      "subCategory/search",
      "product/search",
      "variant/search/:productId",
      "merchant/search",
    ],
    PUT: [
      "admin/edit/:adminId",
      "category/edit/:categoryId",
      "subCategory/edit/:subCategoryId",
      "subCategory/bulkUpsert",
      "product/edit/:productId",
      "variant/edit/:variantId",
      "merchant/:merchantId",
      "merchant/status/:merchantId",
    ],
    DELETE: [
      "admin/remove/:adminId",
      "category/remove/:categoryId",
      "subCategory/remove/:subCategoryId",
      "product/remove/:productId",
      "variant/remove/:variantId",
    ]
  },
  ORDER_DISPATCHER: {
    POST: [],
    GET: [],
    PUT: [],
    DELETE: []
  },
  LISTING_MANAGER: {
    POST: [
      "category/add",
      "subCategory/add",
      "product/add",
      "variant/add",
    ],
    GET: [
      "category/search",
      "subCategory/search",
      "product/search",
      "variant/search/:productId",
    ],
    PUT: [
      "category/edit/:categoryId",
      "subCategory/edit/:subCategoryId",
      "subCategory/bulkUpsert",
      "product/edit/:productId",
      "variant/edit/:variantId",
    ],
    DELETE: [
      "category/remove/:categoryId",
      "subCategory/remove/:subCategoryId",
      "product/remove/:productId",
      "variant/remove/:variantId",
    ]
  },
  MERCHANT: {
    POST: [
      "merchantProduct/add",
    ],
    GET: [
      "merchantProduct/search"
    ],
    PUT: [
      "merchantProduct/edit/:merchantProductId"
    ],
    DELETE: [
      "merchantProduct/remove/:merchantProductId"
    ]
  }
};
