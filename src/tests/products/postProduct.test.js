import { expect, apiRequest } from '../testHelper.js';

describe("POST test/products", () => {

  it("debería crear un nuevo producto con status 200", async () => {
    const newProduct = {
      title: "Nuevo Producto",
      description: "Descripción del producto",
      code: "12345ggg",
      price: 100,
      stock: 10,
      category: "Electrónica",
    };

    const res = await apiRequest
      .post("/test/products")
      .send(newProduct);

    // Verifica que el status de la respuesta sea 200
    expect(res.status).to.equal(200);

    // Verifica que la respuesta tenga la propiedad "Producto" y que incluya el nuevo producto
    expect(res.body).to.have.property("Producto");

    // Verifica que las propiedades del producto creado coincidan con el objeto newProduct
    expect(res.body.Producto).to.include({
      title: newProduct.title,
      description: newProduct.description,
      code: newProduct.code,
      price: newProduct.price,
      stock: newProduct.stock,
    });
  });

  it("debería devolver un error con status 400 si el código ya existe", async () => {
    const duplicateCodeProduct = {
      title: "Producto Duplicado",
      description: "Descripción",
      code: "12345", 
      price: 150,
      stock: 5,
      category: "Electrónica",
    };

    const res = await apiRequest
      .post("/test/products")
      .send(duplicateCodeProduct);

    // Verifica que el status de la respuesta sea 400
    expect(res.status).to.equal(400);

    // Verifica que la respuesta tenga la propiedad "error"
    expect(res.body).to.have.property("error").that.is.a("string");
  });
});
