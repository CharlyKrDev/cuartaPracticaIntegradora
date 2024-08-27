import { expect, apiRequest } from '../testHelper.js';

describe('GET test/carts', () => {
  it('debería devolver una lista de los carritos con status 200', async () => {
    const res = await apiRequest.get('/test/carts');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');  });

  });
  

