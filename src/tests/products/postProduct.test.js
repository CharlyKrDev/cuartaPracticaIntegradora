import { expect, apiRequest } from "../testHelper.js";
import { generateRandomCode, deleteTestProductCode } from "../testUtils.js";

describe("POST test/products", () => {

  let productCode

  it("debería crear un nuevo producto con status 200", async () => {
    const newProduct = {
      title: "PRODUCTO TEST POST",
      description: "Helado de chocolate",
      code: generateRandomCode(), 
      price: 2500,
      stock: 35,
      status: "false",
      category: "Helados",
      thumbnail: ["https://cdn-icons-png.flaticon.com/512/1554/1554591.png"],
      owner: "charlz17@hotmail.com"
    };
    productCode = newProduct.code
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
      owner:newProduct.owner
    });
    await deleteTestProductCode(productCode);


  });



  it("debería devolver un error con status 400 si el código ya existe", async () => {

    const duplicateCodeProduct = {
      title: "Producto Duplicado",
      description: "Descripción del producto duplicado",
      code: "LAHCHO700", 
      price: 150,
      stock: 5,
      category: "Electrónica",
      thumbnail: ["https://cdn-icons-png.flaticon.com/512/1554/1554591.png"],
      owner: "charlz17@hotmail.com"
    };

    const res = await apiRequest
      .post("/test/products")
      .send(duplicateCodeProduct);

    expect(res.status).to.equal(400);

    expect(res.body).to.have.property("status").that.equals("error");
    expect(res.body).to.have.property("message").that.equals("El código ya existe en otro producto");

  });


});
