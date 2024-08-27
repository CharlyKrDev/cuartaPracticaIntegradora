import { expect, apiRequest } from "../testHelper.js";
import { generateRandomCode, deleteTestProduct, createTestProduct } from "../testUtils.js";

describe("POST test/products", () => {
  let createdProductId;

  it("debería crear un nuevo producto con status 200", async () => {
    const newProduct = {
      title: "PRODUCTO TEST POST",
      description: "Helado de chocolate",
      code: generateRandomCode(), 
      price: 2500,
      stock: 35,
      status: "false",
      category: "Helados",
      owner: "charlz17@hotmail.com"
    };

    const res = await apiRequest
      .post("/test/products")
      .send(newProduct);

    expect(res.status).to.equal(200);

    expect(res.body).to.have.property("status").that.equals("success");
    expect(res.body).to.have.property("message").that.equals("Producto creado correctamente");

    expect(res.body.payload).to.include({
      title: newProduct.title,
      description: newProduct.description,
      code: newProduct.code,
      price: newProduct.price,
      stock: newProduct.stock,
    });

  // Guarda el ID del producto creado para borrarlo después
    createdProductId = res.body.payload._id;
  });

  after(async () => {
    try {
      if (createdProductId) {
        await deleteTestProduct(createdProductId);
      }
    } catch (error) {
      console.error('Error al eliminar el producto de prueba:', error);
    }
  });

  it("debería devolver un error con status 400 si el código ya existe", async () => {
    const existingProduct = await createTestProduct({ code: "LAHCHO700" });

    const duplicateCodeProduct = {
      title: "Producto Duplicado",
      description: "Descripción del producto duplicado",
      code: "LAHCHO700", 
      price: 150,
      stock: 5,
      category: "Electrónica",
      owner: "charlz17@hotmail.com"
    };

    const res = await apiRequest
      .post("/test/products")
      .send(duplicateCodeProduct);

    expect(res.status).to.equal(400);

    expect(res.body).to.have.property("status").that.equals("error");
    expect(res.body).to.have.property("message").that.equals("El código ya existe en otro producto");

    await deleteTestProduct(existingProduct._id);
  });
});
