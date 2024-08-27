import { expect, apiRequest } from '../testHelper.js';
import { EMAIL_TEST_SESSION, PASSWORD_TEST_SESSION} from '../testUtils.js';

describe('POST /test/sessions/login', () => {

  it('Debería iniciar sesión y redirigir a /current con status 302', async () => {
    const res = await apiRequest
      .post('/test/sessions/login')
      .send({
        email: EMAIL_TEST_SESSION,
        password: PASSWORD_TEST_SESSION,
      });

    expect(res.status).to.equal(302); 
    expect(res.headers.location).to.equal('/current'); 
  });

  it('Debería fallar al iniciar sesión con datos incorrectos y devolver status 302 por redirección', async () => {
    const res = await apiRequest
      .post('/test/sessions/login')
      .send({
        email: EMAIL_TEST_SESSION,
        password: 'wrongpassword',
      });

      expect(res.status).to.equal(302); // Verifica que el status de la respuesta sea 400
  });

});
