import { requestPasswordReset, resetPassword, renderResetPasswordForm, resetViewPassword } from '../controllers/passwordController.js';
import { Router } from "express";
export const resetPassRouter = Router();



// Ruta para visualizar reset

resetPassRouter.get('/resetpassword', resetViewPassword);

// Ruta para solicitar la recuperación de contraseña
resetPassRouter.post('/password-reset', requestPasswordReset);

// Ruta para renderizar el formulario de recuperación de contraseña
resetPassRouter.get('/password-reset/:token', renderResetPasswordForm);


// Ruta para actualizar la contraseña
resetPassRouter.post('/password-reset/:token', resetPassword);

