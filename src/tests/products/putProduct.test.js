import { expect, apiRequest } from "../../tests/testHelper.js";
import { ID_TEST_INVALID, deleteTestProduct, createTestProductPut } from "../../tests/testUtils.js";

describe("PUT /test/products/:id", () => {
  let productId
  let updatedProduct

  before(async () => {
    const product = await createTestProductPut();
    productId = product._id.toString()
    updatedProduct = product
  });

  it("debería actualizar un producto existente con status 200", async () => {

    const res = await apiRequest
      .put(`/test/products/${productId}`)
      .send(updatedProduct);

    expect(res.status).to.equal(200);

    expect(res.body).to.have.property("status", "success");

    expect(res.body.payload).to.include({
      title: updatedProduct.title,
      description: updatedProduct.description,
      code: updatedProduct.code,
      price: updatedProduct.price,
      status: updatedProduct.status,
      stock: updatedProduct.stock,
      category: updatedProduct.category,
    });


  });



  it("debería devolver un error 404 si el producto no existe", async () => {
    const nonExistentProductId = ID_TEST_INVALID; 

    const res = await apiRequest
      .put(`/test/products/${nonExistentProductId}`)
      .send({
        title: "Producto que no existe",
        code: "CODE12345",
      });

    expect(res.status).to.equal(404);

    expect(res.body).to.have.property("error", "Producto no encontrado");
  });



  it("debería devolver un error 400 si el código ya existe en otro producto", async () => {
    const res = await apiRequest
      .put(`/test/products/${productId}`)
      .send({
        title: "Producto con código duplicado",
        description: "Descripción del producto duplicado",
        code: "alfcap1", 
        price: 200,
        stock: 5,
        category: "Hogar",
        thumbnail: ["https://cdn-icons-png.flaticon.com/512/1554/1554591.png"],
      });

    expect(res.status).to.equal(400);

    expect(res.body).to.have.property("status", "error");

    expect(res.body).to.have.property("message", "El código ya existe en otro producto");
  });

  after(async () => {
    try {
      await deleteTestProduct(productId);
    } catch (error) {
      console.error('Error al eliminar el producto de prueba:', error);
    }
  });

});