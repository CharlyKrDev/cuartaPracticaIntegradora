import { expect, apiRequest } from '../testHelper.js';
import { deleteTestCart } from '../testUtils.js';


describe("POST /test/carts/cart/:cid", () =>{
    let cartId;
    it("Crear un nuevo carrito", async () => {
        const res = await apiRequest
          .post(`/test/carts`);

        cartId = res.body.cart._id
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("message").that.equals("Carrito creado correctamente");

      });


      after(async () => {
        try {
          await deleteTestCart(cartId);
        } catch (error) {
          console.error('Error al eliminar el producto de prueba:', error);
        }
      });
})