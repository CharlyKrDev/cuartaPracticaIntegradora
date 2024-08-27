import { createTestCart, deleteTestCart } from "../testUtils.js";
import { expect, apiRequest } from '../testHelper.js';

describe("GET /test/carts/cart/:cid", () => {
  let cartId;

  before(async () => {
    const cart = await createTestCart();
    cartId = cart._id.toString();
  });

  it("Obtener producto por  ID", async () => {
    const res = await apiRequest
      .get(`/test/carts/cart/${cartId}`);
    expect(res.status).to.equal(200);
  });

  after(async () => {
    try {
      await deleteTestCart(cartId);
    } catch (error) {
      console.error('Error al eliminar el producto de prueba:', error);
    }
  });
  
});
