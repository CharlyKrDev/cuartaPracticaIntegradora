import { expect, apiRequest } from '../testHelper.js';
import { EMAIL_TEST_SESSION, PASSWORD_TEST_SESSION} from '../testUtils.js';


describe('POST /test/sessions/logout', () => {
  
  it('Debería cerrar sesión y redirigir a /login con status 302', async () => {
    await apiRequest
      .post('/test/sessions/login')
      .send({
        email: EMAIL_TEST_SESSION,
        password: PASSWORD_TEST_SESSION,
      });

    const res = await apiRequest
      .post('/test/sessions/logout');

    // Verificar el status de redirección
    expect(res.status).to.equal(302); 
    expect(res.headers.location).to.equal('/login');
  });

  it('Debería manejar el logout correctamente y redirigir al login', async () => {
    const res = await apiRequest
      .post('/test/sessions/logout');

    expect(res.status).to.equal(302);
    expect(res.headers).to.have.property('location', '/login');
  })
});
