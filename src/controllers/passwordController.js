import crypto from "crypto";
import nodemailer from "nodemailer";
import UsersDAO from "../dao/class/users.dao.js";
import dotenv from "dotenv";
import { createHash, comparePassword } from "../utils/functions/hashearPassword.js";
import logger from "../config/loggerConfig.js";

dotenv.config();

export const resetViewPassword = async (req, res) => {
  try {
    res.status(200).render("resetPass", {
      style: "style.css",
    });
  } catch (error) {
    res.status(404).render("404", {
      style: "style.css",
    });
  }
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UsersDAO.getUserByEmail(email);
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    const token = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiration = Date.now() + 3600000; // 1 hora

    await UsersDAO.updateUserPasswordResetToken(
      user._id,
      token,
      resetTokenExpiration
    );

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.MAIL_USER,
      subject: "Password Reset",
      text: `Está recibiendo esto porque usted (u otra persona) ha solicitado el restablecimiento de la contraseña de su cuenta.\n\n
        Haga clic en el siguiente enlace o péguelo en su navegador para completar el proceso en el plazo de una hora tras recibirlo:\n\n
        https://proyectofinalbackend-2024.up.railway.app/password-reset/${token}\n\n
        Si no lo ha solicitado, ignore este correo electrónico y su contraseña permanecerá inalterada.\n`,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`User: ${user.email} ha solicitado recupero de password`)

    res.status(200).json("Recovery email sent");
  } catch (error) {
    logger.error(`Usuario ha solicitado recupero de password, error`)

    console.error("Error al solicitar el rest de la password:", error);
    res.status(500).send("Error al solicitar el rest de la password");
  }
};

export const renderResetPasswordForm = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await UsersDAO.getUserByPasswordResetToken(token);
    if (!user || user.resetTokenExpiration < Date.now()) {
      logger.error(`RenderResetPassword(400): El token del user: ${user._id} email: ${user.email} es invalido o esta vencido`)

      return res
        .status(400)
        .send("El token de reset  es invalido o esta vencido");
    }
    res.render("resetPasswordForm", { token, style: "style.css" });
  } catch (error) {
    logger.error(`RenderResetPassword(500): El token del user es invalido o esta vencido`)
    res.status(500).send("Error al cargar formulario para resetear password");
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    logger.error(`Las passwords del user: ${user._id} email: ${user.email} no coinciden`)

    return res.status(400).json({message:"Las passwords no coinciden"});
  }

  try {
    const user = await UsersDAO.getUserByPasswordResetToken(token);
    if (!user || user.resetTokenExpiration < Date.now()) {
      logger.error(`El token del user: ${user._id} email: ${user.email} es invalido o esta vencido`)
      return res
        .status(400)
        .json({message:"El token de reset  es invalido o esta vencido"});
    }

    // Verifica si la nueva contraseña es igual a la actual
    const isSamePassword = comparePassword(password, user.password);

    if (isSamePassword) {
      logger.error(`La nueva password del user: ${user._id} email: ${user.email} coincide con la anterior`)

      return res
        .status(400)
        .json({message:"La nueva contraseña no puede ser igual a la contraseña actual"});
    }

    const hashedPassword = createHash(password);
    await UsersDAO.updateUserPassword(user._id, hashedPassword);
    logger.info(`La nueva password del user: ${user._id} email: ${user.email} se creo de forma correcta`)

    res.status(200).json({ message: "Su password ha sido reseteado correctamente" });
  } catch (error) {
    res.status(500).send("Ha surgido un error con el reset de la password");
  }

  
};

