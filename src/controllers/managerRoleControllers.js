import usersDAO from "../dao/class/users.dao.js";

// Endpoint para renderizar la plantilla
export const renderRoleUsersApiController = async (req, res) => {
  try {
    res.status(200).render("managerRole", { style: "style.css" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Endpoint para gestionar roles

export const managerRoleUsersApiController = async (req, res) => {
  const { uid } = req.params; 
  const { role } = req.body;

  const newRole = role.toLowerCase()

  try {
    const user = await usersDAO.getUserByEmail(uid);

    if (!user) {
      return res
        .status(404)
        .json({
          message: "El email no corresponde a ningún usuario registrado",
        });
    }

    const userRole = user.role;

    // Verifica que el nuevo rol sea diferente del actual
    if (userRole === newRole.toLowerCase()) {
      return res
        .status(400)
        .json({ message: "No hubo cambio. Porque el rol asignado es el mismo que el vigente" });
    }
    // Verifica que el nuevo rol sea valido
    if (newRole !== 'admin' && newRole !== 'adminMaster' && newRole !== 'user' && newRole !== 'premium') {
        return res
          .status(400)
          .json({ message: "Elegir un rol válido: adminMaster, admin, premium o user" });
    }
    

    // Actualiza el rol del usuario
    await usersDAO.updateUser(user._id, { role: newRole });

    return res
      .status(200)
      .json({ message: `El nuevo rol asignado es ${newRole}` });
  } catch (error) {
    console.error("Error al actualizar el rol del usuario:", error);
    return res.status(500).json({ message: error.message });
  }
};
