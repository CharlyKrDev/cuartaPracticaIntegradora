import { Router } from "express";
import {
  getCartsApiController,
  getCartsApiByIdController,
  createCartApiController,
  addProdCartApiController,
  deleteProdCartApiController,
  deleteCartUserApiController,
} from "../../controllers/cartsApiControllers.js";

const cartsRouterTest = Router();

//Todos los carritos

cartsRouterTest.get("/", getCartsApiController);

// Obtener un carrito por ID
cartsRouterTest.get("/cart/:cid", getCartsApiByIdController);

// Crear un nuevo carrito
cartsRouterTest.post("/", createCartApiController);

// Agregar producto al carrito
cartsRouterTest.put("/:cid/products/:pid", addProdCartApiController);

//Borrar producto del carrito
cartsRouterTest.delete("/:cid/products/:pid", deleteProdCartApiController);

//Borrar carrito
cartsRouterTest.delete("/:cid", deleteCartUserApiController);

export default cartsRouterTest;
