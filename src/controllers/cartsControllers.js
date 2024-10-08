// /src/controllers/cartsController.js
import CartsDAO from "../dao/class/carts.dao.js";
import ProductsDAO from "../dao/class/products.dao.js";
import usersDAO from "../dao/class/users.dao.js";
import EErrors from "../services/enum.js";
import ManagerError from "../services/managerErrors.js";
import { generateCartErrorInfo } from "../services/infoErrors.js";

export const getCartsController = async (req, res) => {
  try {
    const imgCart = "/public/img/carrito.jpg";
    const carts = await CartsDAO.getAllCarts();

    res.render("carts", {
      style: "style.css",
      carts: carts,
      img: imgCart,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error al obtener el carrito por ID`,
      error: error.message,
    });
  }
};

export const getCartsByIdController = async (req, res, next) => {
  const { cid } = req.params;
  try {
    const cart = await CartsDAO.getCartById(cid);
    if (!cart) {
      return next(
        ManagerError.createError({
          name: "getCartByIdError",
          cause: `Invalid cart data: ${JSON.stringify(cid)}`,
          message: generateCartErrorInfo(cid),
          code: EErrors.CART_NOT_FOUND,
          details: { cid },
        })
      );
    }

    let total = 0;
    cart.products.forEach((product) => {
      total += product.quantity * product.productId.price;
    });

    res.render("cart", {
      style: "style.css",
      cart: cart,
      total: total,
    });
  } catch (error) {
    res.status(500).render("noCart", {
      style: "style.css",
      message: `Error al obtener el carrito por ID`,
      error: error.message,
    });
    next(error);
  }
};

export const createCartController = async (req, res) => {
  try {
    const newCart = await CartsDAO.createCart();
    res
      .status(201)
      .json({ cart: newCart, message: `Carrito creado correctamente` });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al crear el carrito`, error: error.message });
  }
};

export const addProdCartController = async (req, res) => {
  const { cid, pid } = req.params;
  const userEmail = req.session.user?.email;
    try {
    const product = await ProductsDAO.getProductById(pid);
    if (!product) {
      return res
        .status(400)
        .json({ message: "Debe seleccionar el id de producto existente" });
    }
    if (product.owner === userEmail) {
      return res
        .status(400)
        .json({ message: "No puedes comprar productos de tu propiedad" });
    }
    const cart = await CartsDAO.addProductToCart(cid, pid);

    res.status(201).json({
      message: `Agregado producto id: ${pid} al carrito id: ${cid}`,
      cart,
    });
  } catch (error) {
    console.error(`Error al agregar el producto al carrito:`, error);
    res.status(500).json({
      message: "Error al agregar el producto al carrito",
      error: error.message,
    });
  }
};

export const deleteProdCartController = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const product = await ProductsDAO.getProductById(pid);
    if (!product) {
      return res
        .status(400)
        .json({ message: "Debe seleccionar el id de producto existente" });
    }

    const cart = await CartsDAO.removeProductFromCart(cid, pid);

    res.status(200).json({
      message: `Actualizada la cantidad del producto id: ${pid} en el carrito id: ${cid}`,
      cart,
    });
  } catch (error) {
    console.error(
      `Error al actualizar la cantidad del producto en el carrito:`,
      error
    );
    res.status(500).json({
      message: "Error al actualizar la cantidad del producto en el carrito",
      error: error.message,
    });
  }
};

export const deleteCartUserController = async (req, res) => {
  const userId = req.user._id;
  let cid;
  try {
    const user = await usersDAO.findUserByOne(userId);
    if (!user) {
      return res
        .status(404)
        .send({ status: "error", message: "Usuario inexistente" });
    }
    cid = user.cart;

    const cart = await CartsDAO.deleteCart(cid);
    await usersDAO.updateUserCart(user._id, undefined);

    res
      .status(200)
      .json({ message: `Carrito ID: ${cid} borrado correctamente!` });
  } catch (error) {
    console.error(`Error al querer borrar carrito:`, error);
    res.status(500).json({
      message: `Al querer borrar el carrito${cid}`,
      error: error.message,
    });
  }
  
};

export const deleteCartController = async (req, res) => {
  const cid = req.params.cid
  try {


    await CartsDAO.deleteCart(cid);

    res.status(200).json({ message: `Carrito ID: ${cid} borrado correctamente!` });
  } catch (error) {
    console.error(`Error al querer borrar carrito:`, error);
    res.status(500).json({
      message: `Al querer borrar el carrito${cid}`,
      error: error.message,
    });
  }}
