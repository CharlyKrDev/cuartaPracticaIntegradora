
import { v4 as uuidv4 } from 'uuid'
import ProductsDAO from "../dao/class/products.dao.js";

import CartsDAO from "../dao/class/carts.dao.js";



export const purchaseCart = async (cartId, user) => {
    const cart = await CartsDAO.getCartById(cartId)
    if (!cart) {
        throw new Error('Carrito no encontrado')
    }

    const unavailableProducts = []
    let totalAmount = 0

    for (const cartProduct of cart.products) {
        const product = await productRepository.getProductById(cartProduct.product._id)
        if (product.stock < cartProduct.quantity) {
            unavailableProducts.push(cartProduct.product._id)
        } else {
            product.stock -= cartProduct.quantity
            await productRepository.updateProductStock(product)
            totalAmount += product.price * cartProduct.quantity
        }
    }

    const purchasedProducts = cart.products.filter(cartProduct => !unavailableProducts.includes(cartProduct.product._id))

    if (purchasedProducts.length > 0) {
        const ticket = new Ticket({
            code: uuidv4(),
            amount: totalAmount,
            purchaser: user.email,
        })
        console.log(ticket)

        await ticketRepository.createTicket(ticket)

        cart.products = cart.products.filter(cartProduct => unavailableProducts.includes(cartProduct.product._id))
        await cartRepository.updateCart(cart)


    await sendPurchaseEmail(user, purchasedProducts, ticket.code)

    return { ticket, unavailableProducts }
    } else {
        return { ticket: null, unavailableProducts }
    }
}