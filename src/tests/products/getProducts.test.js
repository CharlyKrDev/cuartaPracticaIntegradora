import { expect, apiRequest } from '../testHelper.js';

describe('GET /products', () => {
  it('debería devolver una lista de productos con status 200', async () => {
    const res = await apiRequest.get('/test/products');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('productos').that.is.an('array');
    expect(res.body).to.have.property('totalPages').that.is.a('number');
    expect(res.body).to.have.property('page').that.is.a('number');
  });

  it('debería devolver un error con status 400 si los parámetros de paginación son inválidos', async () => {
    const res = await apiRequest.get('/test/products?page=-1&limit=abc');
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error').that.is.a('string');
  });

  it('debería devolver productos paginados correctamente en la primera página', async () => {
    const limit = 10; // Número de productos por página
    const page = 1;  // Página a solicitar

    const res = await apiRequest
    .get('/test/products')
      .query({ limit, page });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('productos');
    expect(res.body.productos).to.be.an('array');
    expect(res.body.productos).to.have.lengthOf(limit);

    // Verifica otras propiedades
    expect(res.body).to.have.property('totalPages');
    expect(res.body).to.have.property('page');
    expect(res.body).to.have.property('hasPrevPage');
    expect(res.body).to.have.property('hasNextPage');
    expect(res.body).to.have.property('prevPage');
    expect(res.body).to.have.property('nextPage');

    // Validar enlaces de paginación
    if (page > 1) {
      expect(res.body.prevLink).to.be.a('string').that.includes('page=' + (page - 1));
    } else {
      expect(res.body.prevLink).to.be.empty;
    }

    if (page < res.body.totalPages) {
      expect(res.body.nextLink).to.be.a('string').that.includes('page=' + (page + 1));
    } else {
      expect(res.body.nextLink).to.be.empty;
    }
  });
  


});
