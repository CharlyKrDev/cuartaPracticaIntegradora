import ProductsDAO from '../dao/class/products.dao.js';
import dotenv from "dotenv";
import CartsDAO from '../dao/class/carts.dao.js';

//General
dotenv.config();
export const MAIL_TESTER = process.env.MAIL_TESTER;
export const PASS_TESTER = process.env.PASS_TESTER;
export const ID_TEST_INVALID = process.env.ID_TEST_INVALID
export const ID_TEST_VALID = process.env.ID_TEST_VALID

//Products
export const createTestProduct = async () => {
  const product = await ProductsDAO.createProduct({
    title: 'Test Product',
    description: 'Un producto para test',
    code: 'TEST123',
    price: 100,
    stock: 10,
    category: 'Testing',
  });
  return product;
};

export const deleteTestProduct = async (productId) => {
  await ProductsDAO.deleteProductById(productId);
};

export const generateRandomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 10; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
// Cart

export const createTestCart = async () => {
  const cart = await CartsDAO.createCart({ products: [] });
  return cart;
};

export const deleteTestCart = async (cartId) => {
  await CartsDAO.deleteCart(cartId);
};

// Session

export const EMAIL_TEST_SESSION= "usuariotest@test.com"
export const PASSWORD_TEST_SESSION= "1234"