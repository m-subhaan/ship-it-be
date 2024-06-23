import { Router } from "express";

import { AuthMiddleware } from "@http/MiddleWares/AuthMiddleware";

import { SubCategoryController } from "@controllers/SubCategoryController";

export const SubCategoryRouter = Router();

SubCategoryRouter.post("/add", AuthMiddleware, SubCategoryController.addSubCategory);
SubCategoryRouter.put("/edit/:subCategoryId", AuthMiddleware, SubCategoryController.updateSubCategory);
SubCategoryRouter.put("/bulkUpsert", AuthMiddleware, SubCategoryController.bulkUpsertSubCategory);
SubCategoryRouter.delete("/remove/:subCategoryId", AuthMiddleware, SubCategoryController.removeSubCategory);
