import express from "express";
import {
  getProductsApi,
  getProductByIdApi,
  deleteProductByIdApi,
  addProductApi,
  updateProductApi,
} from "../../controllers/productsControllers.js";
import { isAdminOrAdminMaster } from "../../middleware/auth.js";
import { isAuthenticated } from "../../middleware/auth.js";

export const productsRouterApi = express.Router();

productsRouterApi.get("/", getProductsApi);
productsRouterApi.get("/:pid", isAuthenticated, getProductByIdApi);
productsRouterApi.delete(
  "/:pid",
  isAuthenticated,
  isAdminOrAdminMaster,
  deleteProductByIdApi
);
productsRouterApi.put(
  "/:pid",
  isAuthenticated,
  isAdminOrAdminMaster,
  updateProductApi
);
productsRouterApi.post(
  "/",
  isAuthenticated,
  isAdminOrAdminMaster,
  addProductApi
);
