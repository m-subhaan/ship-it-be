import { Router } from "express";

import { AuthMiddleware } from "@http/MiddleWares/AuthMiddleware";

import { ProductController } from "@controllers/ProductController";

export const ProductRouter = Router();

ProductRouter.post("/add", AuthMiddleware, ProductController.addProduct);
ProductRouter.get("/search", AuthMiddleware, ProductController.getProducts);
ProductRouter.put("/edit/:productId", AuthMiddleware, ProductController.updateProduct);
ProductRouter.delete("/remove/:productId", AuthMiddleware, ProductController.removeProduct);
