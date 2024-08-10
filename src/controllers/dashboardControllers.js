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


