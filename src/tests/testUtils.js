import ProductsDAO from '../dao/class/products.dao.js';

export const createTestProduct = async () => {
  const product = await ProductsDAO.createProduct({
    title: 'Test Product',
    description: 'A product for testing purposes',
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


import dotenv from "dotenv";
dotenv.config();
export const MAIL_TESTER = process.env.MAIL_TESTER;
export const PASS_TESTER = process.env.PASS_TESTER;
export const ID_TEST_INVALID = process.env.ID_TEST_INVALID