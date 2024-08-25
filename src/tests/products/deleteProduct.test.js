import { expect, apiRequest } from '../testHelper.js';
import { createTestProduct, deleteTestProduct } from "../testUtils.js";
import { ID_TEST_INVALID } from '../testUtils.js';
describe('PUT test/products/:pid', () => {
  let productId;

  before(async () => {
    const product = await createTestProduct();
    productId = product._id.toString();
  });
  

  it('debería actualizar un producto existente con status 200', async () => {
    const updatedProduct = {
      title: 'Producto Actualizado',
      price: 200,
    };

    const res = await apiRequest
      .put(`/test/products/${productId}`)
      .send(updatedProduct);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message').that.equals('Producto actualizado correctamente');
  });

  it('debería devolver un error con status 404 si el producto no existe', async () => {
    const invalidProductId = ID_TEST_INVALID;
    const res = await apiRequest
      .put(`/test/products/${invalidProductId}`)
      .send({ title: 'Producto no existente' });
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('error').that.is.a('string');
  });

  after(async () => {
    try {
      await deleteTestProduct(productId);
    } catch (error) {
      console.error('Error al eliminar el producto de prueba:', error);
    }
  });
  
});
