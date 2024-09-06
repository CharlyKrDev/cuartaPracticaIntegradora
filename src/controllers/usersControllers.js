import UsersDAO from "../dao/class/users.dao.js";
import { sendDeleteAccountEmail } from "../utils/mail/mailing.js";
import logger from "../config/loggerConfig.js";

export const getUsersApi = async (req, res) => {
  try {
    const users = await UsersDAO.getUsersApi();
    
    if (!users || users.length === 0) {
      return res.status(200).json({ status: "success", message: "No hay usuarios" });
    }

    const payload = users.map(user => ({
      name: user.first_name,
      email: user.email,
      role: user.role,
    }));

    res.status(200).json({ status: "success", payload });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Problemas de conexión" });
  }
};

export const deleteIdleUsers = async (req, res) => {
    const currentDate = new Date(); 
    const users = await UsersDAO.getUsersApi(); 
    try {
      if (!users || users.length === 0) {
        return res.status(200).json({ status: "success", message: "No hay usuarios" });
      }
  
      // Filtrar los usuarios inactivos durante más de 2 días
      const idleUsers = users.filter(user => {
        const lastConnectionDate = new Date(user.last_connection); 
        const diffInTime = currentDate - lastConnectionDate; 
        const diffInDays = diffInTime / (1000 * 60 * 60 * 24); 
  
        return diffInDays > 2; 
      });
  
      if (idleUsers.length === 0) {
        return res.status(200).json({ status: "success", message: "No hay usuarios inactivos" });
      }
  
      // Eliminar usuarios inactivos
      const deletedUsers = [];
      for (const user of idleUsers) {
        await UsersDAO.deleteUserById(user._id); 
        await sendDeleteAccountEmail(user)   

        deletedUsers.push(user.email); 
      }
      logger.info(`Usuarios eliminados ${deletedUsers}`)
      return res.status(200).json({
        status: "success",
        message: `Se eliminaron ${deletedUsers.length} usuarios inactivos`,
        deletedUsers,
      });
      
    } catch (error) {
      console.error("Error eliminando usuarios inactivos:", error);
      res.status(500).json({ status: "error", message: "Error al eliminar usuarios inactivos" });
    }
  };
  