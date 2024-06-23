import { Router } from "express";

import { AuthMiddleware } from "@http/MiddleWares/AuthMiddleware";

import { MerchantProductController } from "@controllers/MerchantProductController";

export const MerchantProductRouter = Router();

MerchantProductRouter.post("/add", AuthMiddleware, MerchantProductController.addMerchantProduct);
MerchantProductRouter.get("/search", AuthMiddleware, MerchantProductController.getMerchantProducts);
MerchantProductRouter.put("/edit/:merchantProductId", AuthMiddleware, MerchantProductController.updateMerchantProduct);
MerchantProductRouter.delete("/remove/:merchantProductId", AuthMiddleware, MerchantProductController.removeMerchantProduct);
