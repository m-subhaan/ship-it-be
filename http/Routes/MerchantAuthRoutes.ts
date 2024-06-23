import { Router } from "express";

import MerchantAuthController from "@controllers/MerchantAuthController";

export const MerchantAuthRouter = Router();

MerchantAuthRouter.post("/login", MerchantAuthController.login);
MerchantAuthRouter.post("/forgotPassword", MerchantAuthController.forgotPassword);
MerchantAuthRouter.post("/resetPassword/:resetPasswordToken", MerchantAuthController.resetPassword);
