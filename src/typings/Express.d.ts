import type AdminEntity from "@entities/Admin/AdminEntity";
import type { MerchantEntity } from "@entities/Merchant/MerchantEntity";
import type e from "express";

export type TRequest = e.Request & { admin?: AdminEntity, merchant?: MerchantEntity };
export type TResponse = e.Response;
export type TNext = e.NextFunction;
export type TError = e.Errback;