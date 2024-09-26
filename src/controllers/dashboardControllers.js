import UsersDAO from "../dao/class/users.dao.js";
import { sendDeleteAccountEmail } from "../utils/mail/mailing.js";
export const dashboardRender = (req, res) => {
  const userMail = req.user.email;
  const userRole = req.user.role;
  const userName = req.user.first_name;
  res.render("dashboardProducts", {
    style: "style.css",
    email: userMail,
    role: userRole,
    name: userName,
    admin: userRole === "admin" || userRole === "adminMaster",
  });
};

export const renderDashboardUserPage = (req, res) => {
  res.render("dashboardUsers", { style: "style.css" });
};

// Controlador que busca un usuario por email y lo renderiza en la plantilla
export const dashboardUser = async (req, res) => {
  const { email } = req.query;
  const userEmail = email.toLowerCase()

  try {
    const user = await UsersDAO.getUserByEmail(userEmail);

    if (!user) {
      return res.render("dashboardUsers", {
        style: "style.css",
        error: "Usuario no encontrado",
      });
    }

    res.render("dashboardUsers", {
      style: "style.css",
      user: user,
    });
  } catch (error) {
    res.render("dashboardUsers", {
      style: "style.css",
      error: "Error en el servidor",
    });
  }
};

export const dashboardDeleteUser = async (req, res) => {
  const { uemail } = req.params;
  try {
    const user = await UsersDAO.getUserByEmail(uemail);
    if (!user) {
      return res.status(400).json({ status: "error", message: "Usuario inexistente" });
    }

    await UsersDAO.deleteUserById(user._id);
    await sendDeleteAccountEmail(user);
    res
      .status(200)
      .json({ status: "success", message: "Usuario eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "Error",
        message: `Error al querer borrar el usuario`,
        error: error.message,
      });
  }
};
