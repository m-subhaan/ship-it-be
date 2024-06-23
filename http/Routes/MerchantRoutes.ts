import {AuthMiddleware} from "@http/MiddleWares/AuthMiddleware";
import {Router} from "express";

import {MerchantController} from "@controllers/MerchantController";

export const MerchantRouter = Router();

MerchantRouter.post("/signup", MerchantController.addMerchant);
MerchantRouter.put("/:merchantId", AuthMiddleware, MerchantController.updateMerchant);
MerchantRouter.get("/search", AuthMiddleware, MerchantController.getMerchants);
MerchantRouter.put("/status/:merchantId", AuthMiddleware, MerchantController.updateMerchantStatus);
