import { Router } from "express";

import { AuthMiddleware } from "@http/MiddleWares/AuthMiddleware";

import { CategoryController } from "@controllers/CategoryController";

export const CategoryRouter = Router();

CategoryRouter.post("/add", AuthMiddleware, CategoryController.addCategory);
CategoryRouter.get("/search", AuthMiddleware, CategoryController.getCategories);
CategoryRouter.put("/edit/:categoryId", AuthMiddleware, CategoryController.updateCategory);
CategoryRouter.delete("/remove/:categoryId", AuthMiddleware, CategoryController.removeCategory);
