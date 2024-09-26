import express from "express";
import { dashboardRender, dashboardUser, renderDashboardUserPage } from "../controllers/dashboardControllers.js";
import { dashBoardAccess, isAdminOrAdminMaster} from "../middleware/auth.js";
import { isAuthenticated } from "../middleware/auth.js";

export const dashboardProductsRouter = express.Router();

dashboardProductsRouter.get("/dashBoardProducts",isAuthenticated, dashBoardAccess, dashboardRender);
dashboardProductsRouter.get("/dashboardUsers",isAuthenticated,isAdminOrAdminMaster, dashboardUser);
dashboardProductsRouter.get("/dashboardUsersPage",isAuthenticated,isAdminOrAdminMaster, renderDashboardUserPage);