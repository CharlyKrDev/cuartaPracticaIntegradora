import { expect, apiRequest } from "../testHelper.js";
import { createTestProduct, deleteTestProduct } from "../testUtils.js";

describe("PUT /test/products/:id", () => {
  let productId;

  // Antes de cada prueba, crear un producto de prueba
  before(async () => {
    const product = await createTestProduct();
    productId = product._id.toString();
  });

  it("debe actualizar un producto", async () => {
    const updatedProduct = {
      title: "Nuevo Título de Producto",
      description: "Nueva descripción del producto",
      price: 29.99,
      stock: 15,
    };

    const res = await apiRequest
      .put(`/test/products/${productId}`)
      .send(updatedProduct);

    // Verifica que el status de la respuesta sea 200
    expect(res.status).to.equal(200);

    // Verifica que la respuesta tenga la propiedad "status" y sea "success"
    expect(res.body).to.have.property("status", "success");

    // Verifica que la respuesta tenga un payload con el título actualizado
    expect(res.body.payload).to.have.property("title", "Nuevo Título de Producto");
  });

  after(async () => {
    try {
      await deleteTestProduct(productId);
    } catch (error) {
      console.error("Error al eliminar el producto de prueba:", error);
    }
  });
});
