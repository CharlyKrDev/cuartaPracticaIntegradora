import { expect, apiRequest } from '../testHelper.js';
import { createTestProduct} from "../testUtils.js";
import { ID_TEST_INVALID } from '../testUtils.js';
describe('DELETE test/products/:pid', () => {
  let productId;

  before(async () => {
    const product = await createTestProduct();
    productId = product._id.toString();
  });

  it('Debería borrar producto y devolver status 200', async () => {
    const res = await apiRequest
      .delete(`/test/products/${productId}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message').that.equals(`El producto id: ${productId} ha sido eliminado correctamente`);
  });

  it('debería devolver un error con status 404 si el producto no existe', async () => {
    const invalidProductId = ID_TEST_INVALID;
    const res = await apiRequest
      .put(`/test/products/${invalidProductId}`)
      .send({ title: 'Producto no existente' });
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('error').that.is.a('string');
  });

  
});
