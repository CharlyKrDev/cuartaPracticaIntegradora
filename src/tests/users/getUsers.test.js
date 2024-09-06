import { expect, apiRequest } from '../testHelper.js';

describe('GET api/users', () => {
  it('debería devolver una lista de todos los usuarios con status 200', async () => {
    const res = await apiRequest.get('/api/users');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');  });

  });
  

