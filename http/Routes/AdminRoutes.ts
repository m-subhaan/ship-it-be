import { Router } from "express";

import { AuthMiddleware } from "@http/MiddleWares/AuthMiddleware";

import { AdminController } from "@controllers/AdminController";

export const AdminRouter = Router();

AdminRouter.post("/add", AdminController.addAdmin);
AdminRouter.get("/search", AuthMiddleware, AdminController.getAdmins);
AdminRouter.put("/edit/:adminId", AuthMiddleware, AdminController.updateAdmin);
AdminRouter.delete("/remove/:adminId", AuthMiddleware, AdminController.removeAdmin);
