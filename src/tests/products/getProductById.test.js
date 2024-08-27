import { createTestProduct, deleteTestProduct, ID_TEST_INVALID } from "../../tests/testUtils.js";
import { expect, apiRequest } from '../../tests/testHelper.js';

describe("GET /test/products/:pid", () => {
  let productId;
  let productCode;
  const idInvalid = ID_TEST_INVALID

  before(async () => {
    const product = await createTestProduct();
    productId = product._id.toString();
    productCode = product.code;
    console.log(`probando id get: ${productId}`)

  });

  it("Debería devolver producto por ID", async () => {
    const res = await apiRequest
      .get(`/test/products/${productId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("_id").that.equals(productId);
      expect(res.body).to.have.property("title").that.equals("Test Product GET");
      expect(res.body).to.have.property("description").that.equals("Un producto para test");
      expect(res.body).to.have.property("price").that.equals(100);
      expect(res.body).to.have.property("stock").that.equals(10);
      expect(res.body).to.have.property("category").that.equals("Testing");
  });

  it("Debería devolver error 400 por producto inexistente", async () => {
    const res = await apiRequest
      .get(`/test/products/${idInvalid}`);
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error').that.is.a('string');

  });

  after(async () => {
    try {
      console.log(`code get:${productId}`)
      await deleteTestProduct(productId);
    } catch (error) {
      console.error('Error al eliminar el producto de prueba:', error);
    }
  });
  
});
