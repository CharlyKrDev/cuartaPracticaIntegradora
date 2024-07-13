import CartsDAO from "../dao/class/carts.dao.js";
import ProductsDAO from "../dao/class/products.dao.js";
import usersDAO from "../dao/class/users.dao.js";
import TicketRepository from "../repository/ticketRepository.js";

export const finalizePurchaseController = async (req, res) => {
  const cartId = req.params.cid;
  const userId = req.user._id;
  let totalAmount = 0;
  let purchasedProducts = [];
  let productsOutOfStock = [];

  try {
    const cart = await CartsDAO.getCartByIdSinLean(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    // Verificar y actualizar stock de productos
    for (const item of cart.products) {
      if (item.productId.stock >= item.quantity) {
        totalAmount += item.productId.price * item.quantity;
        purchasedProducts.push({
          productId: item.productId._id,
          title: item.productId.title,
          price: item.productId.price,
          quantity: item.quantity
        });
        await ProductsDAO.updateOneProduct(item.productId._id, {
          $inc: { stock: -item.quantity }
        });
      } else {
        productsOutOfStock.push({
          productId: item.productId._id,
          title: item.productId.title,
          stock: item.productId.stock,
          quantity: item.quantity
        });
      }
    }

    // Crear ticket
    if (purchasedProducts.length > 0) {
      const ticket = await TicketRepository.createTicket(totalAmount, req.user.email);

      // Agregar ticket al usuario
      const user = await usersDAO.findUserById(userId);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      user.tickets = user.tickets || [];
      user.tickets.push(ticket._id);
      await user.save();
    }

    // Actualizar carrito con productos no comprados
    cart.products = productsOutOfStock;
    await cart.save();

    console.log({
        purchasedProducts,
        productsOutOfStock,
        totalAmount,
        cartId,
      });
      

    res.render("purchaseSummary", {
      style: "style.css",
      purchasedProducts,
      productsOutOfStock,
      totalAmount,
      cartId,
    });

  } catch (error) {
    console.error("Error al finalizar la compra:", error); // Añadir log detallado
    res.status(500).json({ message: "Error al finalizar la compra", error });
  }
};
