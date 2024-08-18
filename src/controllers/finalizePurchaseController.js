import CartsDAO from "../dao/class/carts.dao.js";
import ProductsDAO from "../dao/class/products.dao.js";
import usersDAO from "../dao/class/users.dao.js";
import TicketRepository from "../repository/ticketRepository.js";
import purchaseDetailModel from "../data/models/purchase.model.js";
import { sendConfirmationEmail } from "../utils/mail/mailing.js";
import ManagerError from "../services/managerErrors.js";
import { generateOutOfStockErrorInfo } from "../services/infoErrors.js";
import EErrors from "../services/enum.js";
import logger from "../config/loggerConfig.js";

export const finalizePurchaseController = async (req, res) => {
  const cartId = req.params.cid;
  const userId = req.user._id;
  let totalAmount = 0;
  let purchasedProducts = [];
  let productsOutOfStock = [];

  try {
    const cart = await CartsDAO.getCartByIdWithoutLean(cartId);

    if (!cart){
      throw ManagerError.createError({
        name: "getCartByIdError",
        cause: `Invalid cart data: ${JSON.stringify(cartId)}`,
        message: generateCartErrorInfo(cartId),
        code: EErrors.CART_NOT_FOUND,
        details: { cid:cartId }
      })
    }

    // Verificar y actualizar stock de productos
    for (const item of cart.products) {
      if (item.productId.stock >= item.quantity) {
        totalAmount += item.productId.price * item.quantity;
        purchasedProducts.push({
          productId: item.productId._id,
          title: item.productId.title,
          code: item.productId.code,
          description: item.productId.description,
          price: item.productId.price,
          quantity: item.quantity,
        });
        await ProductsDAO.updateOneProduct(item.productId._id, {
          $inc: { stock: -item.quantity },
        });
      } else {
        productsOutOfStock.push({
          productId: item.productId._id,
          title: item.productId.title,
          stock: item.productId.stock,
          quantity: item.quantity,
        });
        
        // Registrar el error en la consola sin interrumpir la ejecución
        ManagerError.createError({
          name: "outStockError",
          cause: `Productos fuera de stock: ${JSON.stringify(productsOutOfStock)}`,
          message: generateOutOfStockErrorInfo(item.productId._id, item.productId.stock),
          code: EErrors.OUT_OF_STOCK,
          details: { productId: item.productId._id, availableStock: item.productId.stock, requestedQuantity: item.quantity }
        });
      }
    }

    // Crear ticket
    if (purchasedProducts.length > 0) {
      const ticket = await TicketRepository.createTicket({
        amount: totalAmount,
        purchaser: req.user.email,
      });

      // Crear detalles de compra
      const purchaseDetails = [];
      for (const product of purchasedProducts) {
        const purchaseDetail = await purchaseDetailModel.create({
          ...product,
          ticket: ticket._id,
        });
        purchaseDetails.push(purchaseDetail);
      }

      // Actualizar el ticket con los detalles de compra
      ticket.purchaseDetails = purchaseDetails.map((pd) => pd._id);
      await ticket.save();

      // Agregar ticket al usuario
      const user = await usersDAO.findUserById(userId);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      user.tickets = user.tickets || [];
      user.tickets.push(ticket._id);
      await usersDAO.updateUser(userId, { tickets: user.tickets });

      // Enviar correo de confirmación

      if (purchasedProducts.length > 0) {

      await sendConfirmationEmail(
        user,
        purchasedProducts,
        totalAmount,
        ticket.code
      );
      logger.info(`El usuario ${userId} con email ${user.email} ha realizado de forma correcta una compra con ticket ${ticket._id}`)
    }
    }

    // Actualizar carrito con productos no comprados
    cart.products = productsOutOfStock;
    await cart.save();
    res.render("purchaseSummary", {
      style: "style.css",
      purchasedProducts,
      productsOutOfStock,
      totalAmount,
      cartId,
    });
  } catch (error) {
    console.error("Error al finalizar la compra:", error);
    res.status(500).json({ message: "Error al finalizar la compra", error });
  }
};
