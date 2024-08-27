import {
  createTestCart,
  deleteTestCart,
  ID_TEST_INVALID,
} from "../testUtils.js";
import { expect, apiRequest } from "../testHelper.js";

describe("GET /test/carts/cart/:cid", () => {
  const idInvalid = ID_TEST_INVALID;

  let cartId;

  before(async () => {
    const cart = await createTestCart();
    cartId = cart._id.toString();
  });

  it("Obtener carrito por  ID", async () => {
    const res = await apiRequest.get(`/test/carts/cart/${cartId}`);
    expect(res.status).to.equal(200);
  });

  it("Debería devolver error 400 por carrito inexistente", async () => {
    const res = await apiRequest.get(`/test/carts/cart/${idInvalid}`);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error").that.is.a("string");
  });

  after(async () => {
    try {
      await deleteTestCart(cartId);
    } catch (error) {
      console.error("Error al eliminar el producto de prueba:", error);
    }
  });
});
