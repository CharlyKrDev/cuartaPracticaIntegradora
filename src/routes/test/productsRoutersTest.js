import express from "express";
import {
  getProductsApi,
  getProductByIdApi,
  deleteProductByIdApi,
  addProductApi,
  updateProductApi,
} from "../../controllers/productsControllers.js";

export const productsRouterTest = express.Router();

productsRouterTest.get("/", getProductsApi);
productsRouterTest.get("/:pid", getProductByIdApi);
productsRouterTest.delete("/:pid", deleteProductByIdApi);
productsRouterTest.put("/:pid", updateProductApi);
productsRouterTest.post("/", addProductApi);
