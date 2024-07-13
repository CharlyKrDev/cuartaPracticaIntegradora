import usersDAO from "../dao/class/users.dao.js";

export const renderMessages = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await usersDAO.findUserByOne(userId);
    if (!user) {
      return res
        .status(404)
        .send({ status: "error", message: "Usuario inexistente" });
    }

    const userEmail = user.email;

    if (!userEmail) {
      return res
        .status(404)
        .send({ status: "error", message: "Email inexistente" });
    }

    res.render("chat", {
      style: "style.css",
      email: userEmail,
    });
  } catch (error) {
    console.error(`Error al contactar con atención al cliente`, error);
    res.status(500).json({
      message: `Error al contactar con atención al cliente`,
      error: error.message,
    });
  }
};
