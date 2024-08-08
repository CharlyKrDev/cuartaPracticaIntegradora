import { Router } from "express";
import {
  getCartsApiController,
  getCartsApiByIdController,
  createCartApiController,
  addProdCartApiController,
  deleteProdCartApiController,
  deleteCartUserApiController,
} from "../../controllers/cartsApiControllers.js";
import { isAdminOrAdminMaster } from "../../middleware/auth.js";
import { isAuthenticated, isCartOwner } from "../../middleware/auth.js";

const cartsRouterApiM = Router();

//Todos los carritos

cartsRouterApiM.get(
  "/",
  isAuthenticated,
  isAdminOrAdminMaster,
  getCartsApiController
);

// Obtener un carrito por ID
cartsRouterApiM.get("/cart/:cid", isAdminOrAdminMaster, getCartsApiByIdController);

// Crear un nuevo carrito
cartsRouterApiM.post("/",isAuthenticated,isAdminOrAdminMaster, createCartApiController);

// Agregar producto al carrito
cartsRouterApiM.put("/:cid/products/:pid",isAuthenticated,isCartOwner, addProdCartApiController);

//Borrar producto del carrito
cartsRouterApiM.delete("/:cid/products/:pid",isAuthenticated,isCartOwner, deleteProdCartApiController);

//Borrar carrito
cartsRouterApiM.delete("/:cid", isAdminOrAdminMaster, deleteCartUserApiController);

export default cartsRouterApiM;
