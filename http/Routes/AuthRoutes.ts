import { Router } from "express";

import AuthController from "@controllers/AuthController";

export const AuthRouter = Router();

AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/forgotPassword", AuthController.forgotPassword);
AuthRouter.post("/resetPassword/:resetPasswordToken", AuthController.resetPassword);
