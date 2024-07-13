import { Router } from "express";
import { isAdminOrAdminMaster } from "../middleware/auth.js";
import { isAuthenticated, isCartOwner } from "../middleware/auth.js";
import { getCartsController, getCartsByIdController, createCartController, addProdCartController, deleteProdCartController, deleteCartUserController } from "../controllers/cartsControllers.js";
import { finalizePurchaseController } from "../controllers/finalizePurchaseController.js";
const cartsRouterM = Router();

//Todos los carritos

cartsRouterM.get("/",isAuthenticated, isAdminOrAdminMaster, getCartsController);

// Obtener un carrito por ID
cartsRouterM.get("/cart/:cid", isCartOwner, getCartsByIdController);

// Crear un nuevo carrito
cartsRouterM.post("", isAuthenticated, isAdminOrAdminMaster, createCartController);

// Agregar producto al carrito
cartsRouterM.put("/:cid/products/:pid", addProdCartController);
//Borrar producto del carrito
cartsRouterM.delete("/:cid/products/:pid", isAuthenticated, deleteProdCartController);

//Borrar carrito del usuario
cartsRouterM.delete("/:cid",isAuthenticated, deleteCartUserController);

//Finalizar Compra
cartsRouterM.get("/:cid/purchase", isCartOwner, isAuthenticated, finalizePurchaseController);

export default cartsRouterM;
