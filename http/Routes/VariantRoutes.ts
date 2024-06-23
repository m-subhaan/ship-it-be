import { Router } from "express";

import { AuthMiddleware } from "@http/MiddleWares/AuthMiddleware";

import { VariantController } from "@controllers/VariantController";

export const VariantRouter = Router();

VariantRouter.post("/add", AuthMiddleware, VariantController.addVariant);
VariantRouter.get("/search/:productId", AuthMiddleware, VariantController.getVariants);
VariantRouter.put("/edit/:variantId", AuthMiddleware, VariantController.updateVariant);
VariantRouter.delete("/remove/:variantId", AuthMiddleware, VariantController.removeVariant);
