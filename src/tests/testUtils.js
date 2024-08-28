import ProductsDAO from '../dao/class/products.dao.js';
import dotenv from "dotenv";
import CartsDAO from '../dao/class/carts.dao.js';

//General
dotenv.config();
export const MAIL_TESTER = process.env.MAIL_TESTER;
export const PASS_TESTER = process.env.PASS_TESTER;
export const ID_TEST_INVALID = process.env.ID_TEST_INVALID

//Products
export const createTestProduct = async () => {
  const product = await ProductsDAO.createProduct({
    title: 'Test Product GET',
    description: 'Un producto para test',
    code: 'TEST123',
    price: 100,
    stock: 10,
    category: 'Testing',
    thumbnail: ["https://cdn-icons-png.flaticon.com/512/1554/1554591.png"],

  });
  return product;
};

export const createTestProductPost = async () => {
  const product = await ProductsDAO.createProduct({
    title: 'Test Product POST',
    description: 'Un producto para test',
    code: 'TEST123',
    price: 100,
    stock: 10,
    category: 'Testing',
    thumbnail: ["https://cdn-icons-png.flaticon.com/512/1554/1554591.png"],

  });
  return product;
};

export const createTestProductDelete = async () => {
  const product = await ProductsDAO.createProduct({
    title: 'Test Product DELETE',
    description: 'Un producto para test',
    code: 'TESTDELETE123',
    price: 100,
    stock: 10,
    category: 'Testing',
    thumbnail: ["https://cdn-icons-png.flaticon.com/512/1554/1554591.png"],

  });
  return product;
};

export const createTestProductPut = async () => {
  const product = await ProductsDAO.createProduct({
    title: 'Test Product PUT',
    description: 'Un producto para test',
    code: 'TESTPUT123',
    price: 100,
    stock: 10,
    category: 'Testing',
    thumbnail: ["https://cdn-icons-png.flaticon.com/512/1554/1554591.png"],

  });
  return product;
}


export const deleteTestProduct = async (productId) => {
  await ProductsDAO.deleteProductById(productId);
};

export const deleteTestProductCode = async (productCode) => {
  await ProductsDAO.deleteProductByCode(productCode);
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