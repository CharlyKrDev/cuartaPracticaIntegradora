import { Router } from "express";
import { isAdminOrAdminMaster } from "../middleware/auth.js";
import { isAuthenticated, isCartOwner } from "../middleware/auth.js";
import { getCartsController, getCartsByIdController,deleteCartController, createCartController, addProdCartController, deleteProdCartController, deleteCartUserController } from "../controllers/cartsControllers.js";
import { finalizePurchaseController } from "../controllers/finalizePurchaseController.js";
const cartsRouterM = Router();

//Todos los carritos

cartsRouterM.get("/",isAuthenticated, isAdminOrAdminMaster, getCartsController);

// Obtener un carrito por ID
cartsRouterM.get("/cart/:cid",isAuthenticated, isCartOwner, getCartsByIdController);

// Crear un nuevo carrito
cartsRouterM.post("/", isAuthenticated, isAdminOrAdminMaster, createCartController);

// Agregar producto al carrito
cartsRouterM.put("/:cid/products/:pid",isAuthenticated,isCartOwner, addProdCartController);
//Borrar producto del carrito
cartsRouterM.delete("/:cid/products/:pid", isAuthenticated,isCartOwner, deleteProdCartController);

//Borrar carrito del usuario
cartsRouterM.delete("/:cid",isAuthenticated,isCartOwner, deleteCartUserController);

//Finalizar Compra
cartsRouterM.get("/:cid/purchase", isAuthenticated,  isCartOwner, finalizePurchaseController);

//Borrar carrito general

cartsRouterM.delete("/cart/:cid", deleteCartController);


export default cartsRouterM;
