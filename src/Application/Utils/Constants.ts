import { aws, server, storagePath } from "@infraConfig/index";

export const REQUEST_METHODS = { GET: "GET", POST: "POST", PUT: "PUT", DELETE: "DELETE" } as const;

export const BOOLEAN_VALUES = { TRUE: "true", FALSE: "false" } as const;

export const NODE_ENV = { PROD: "PROD", DEV: "DEV" } as const;

export const STORAGE_PATH = {
  TEMP: `${storagePath}/tmp`,
  LOG: `${storagePath}/logs`,
  PROCESS_FILE: `${storagePath}/ProcessFiles`
};

export const SERVER_CONFIG = {
  PORT: server.PORT,
  APP_NAME: server.APP_NAME,
  NODE_ENV: server.NODE_ENV,
  SECRET: server.SECRET,
  APP_URL: server.APP_URL,
};

export const RESPONSE_MESSAGES = {
  ERROR: "Bad request",
  NOT_AUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden access",
  NOT_FOUND: "No data found",
  PASSWORD_EXPIRED: "Password expired",
  CONFLICT: "Already exists",
  INTERNAL_SERVER_ERROR: "Internal server error"
};

export const NOT_FOUND_MESSAGES = {
  ADMIN: "ADMIN not found",
  CATEGORY: "CATEGORY not found",
  MERCHANT: "MERCHANT not found",
  MERCHANT_PRODUCT: "MERCHANT_PRODUCT not found",
  MERCHANT_VARIANT: "MERCHANT_VARIANT not found",
  PRODUCT: "PRODUCT not found",
  SUBCATEGORY: "SUBCATEGORY not found",
  VARIANT: "VARIANT not found",
}

export const DATE_TIME_FORMAT = {
  YMD_HM_FORMAT: "yyyy-MM-dd H:mm",
  YMD_FORMAT: "yyyy-MM-dd",
  HMS_FORMAT: "HH:mm:ss",
  YMD_HMS_FORMAT: "yyyy-MM-dd HH:mm:ss",
  MDY_FORMAT: "MM/dd/yyyy",
};

export const APP_URLS = {
  APP_URL: server.APP_URL,
  ADMIN_RESET_PASSWORD_URL: `${server.APP_URL}/auth/reset`,
  ADMIN_FORGOT_PASSWORD_URL: `${server.APP_URL}/forgot`,
  MERCHANT_RESET_PASSWORD_URL: `${server.APP_URL}/merchant/auth/reset`,
  MERCHANT_FORGOT_PASSWORD_URL: `${server.APP_URL}/merchant/forgot`,
};

export const EMAIL_TYPES = {
  HTML: "text/html",
  TEXT: "text/plain"
} as const;

export const ORDER_BY = {
  ASC: "ASC",
  DESC: "DESC"
} as const;

export const TIMEZONES = {
  UTC: "UTC",
  PAKISTAN_KARACHI: "Asia/Karachi"
};

export const FILE_ENCODINGS = {
  BASE64: "base64",
  ASCII: "ascii",
  UTF8: "utf-8"
} as const;

export const BUKCETS = {
  SHIP_IT: aws.AWS_BUCKET
};

export const BUCKET_FOLDERS = {
  PRODUCT: "PRODUCT",
  VARIANT: "VARIANT",
  MERCHANT: "MERCHANT"
};

export const CREDENTIALS = {
  AWS_ACCESS_KEY_ID: aws.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: aws.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: aws.AWS_REGION
};

export const SECONDS_IN = {
  ONE_DAY: 86400,
  ONE_WEEK: 604800
};
