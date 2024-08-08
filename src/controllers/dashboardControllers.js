export const dashboardRender = (req, res) => {
  const userMail = req.user.email
    res.render("dashboardProducts", {
      style: "style.css",
      email: userMail,
    });
  }


