import { createTestProduct, deleteTestProduct } from "../../tests/testUtils.js";
import { expect, apiRequest } from '../../tests/testHelper.js';

describe("GET /test/products/:pid", () => {
  let productId;

  before(async () => {
    const product = await createTestProduct();
    productId = product._id.toString();
  });

  it("should get a product by ID", async () => {
    const res = await apiRequest
      .get(`/test/products/${productId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("_id").that.equals(productId);
      expect(res.body).to.have.property("title").that.equals("Test Product");
      expect(res.body).to.have.property("description").that.equals("Un producto para test");
      expect(res.body).to.have.property("price").that.equals(100);
      expect(res.body).to.have.property("stock").that.equals(10);
      expect(res.body).to.have.property("category").that.equals("Testing");
  });

  after(async () => {
    try {
      await deleteTestProduct(productId);
    } catch (error) {
      console.error('Error al eliminar el producto de prueba:', error);
    }
  });
  
});
