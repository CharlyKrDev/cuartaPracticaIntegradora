import productsModel from "../../data/models/products.model.js";
import mongoose from "mongoose";
import logger from "../../config/loggerConfig.js";
import ManagerError from "../../services/managerErrors.js";
import { generateProductErrorInfo } from "../../services/infoErrors.js";
import EErrors from "../../services/enum.js";

class ProductsDAO {
  async getProductById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.error(`getProductById, ID inválido ${id}`);
      ManagerError.createError({
        name: "getCartByIdError",
        cause: `Invalid product ID: ${JSON.stringify(id)}`,
        message: generateProductErrorInfo(id),
        code: EErrors.PRODUCT_NOT_FOUND,
        details: { PID: id },
      });
    }
    const product = await productsModel.findById(id);
 
      return product;
    
  }
  async findProducts() {
    return await productsModel.find().lean();
  }
  async createProduct(fields) {
    return await productsModel.create(fields);
  }
  async getProductsLimit(limit) {
    return await productsModel.find().limit(limit);
  }
  async getProducts() {
    return await productsModel.find().limit();
  }
  async getProductByCode(code) {
    return await productsModel.find(code);
  }

  async updateOneProduct(productId, updateFields) {
    return await productsModel.updateOne({ _id: productId }, updateFields);
  }

  async deleteProductById(productId) {
    await productsModel.deleteOne({ _id: productId });
  }

  async deleteProductByCode(productCode) {
    await productsModel.deleteOne({code: productCode });
  }

  async getTotalProductsCount() {
    return await productsModel.countDocuments();
  }

  async getProductsPaginated(options) {
    return await productsModel.paginate({}, options);
  }
}

export default new ProductsDAO();
