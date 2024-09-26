import UsersDAO from "../dao/class/users.dao.js"
export const dashboardRender = (req, res) => {
  const userMail = req.user.email
  const userRole = req.user.role
  const userName = req.user.first_name
    res.render("dashboardProducts", {
      style: "style.css",
      email: userMail,
      role: userRole,
      name: userName,
      admin: userRole === "admin" || userRole==="adminMaster"
    });
  }

  export const renderDashboardUserPage = (req, res) => {
    res.render('dashboardUsers', { style: "style.css" }); 
};

// Controlador que busca un usuario por email y lo renderiza en la plantilla
export const dashboardUser = async (req, res) => {
    const { email } = req.query;

    try {
        const user = await UsersDAO.getUserByEmail(email);

        if (!user) {
            return res.render('dashboardUsers', { 
                style: "style.css", 
                error: 'Usuario no encontrado' 
            });
        }

        res.render('dashboardUsers', {
            style: "style.css",
            user: user
        });
    } catch (error) {
        res.render('dashboardUsers', { 
            style: "style.css", 
            error: 'Error en el servidor' 
        });
    }
};