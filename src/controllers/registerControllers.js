export const renderLogin = (req, res) => {
    res.render("login", { style: "style.css" });
  };
  
  export const renderRegister = (req, res) => {
    res.render("register", { style: "style.css" });
  };
  
  export const renderCurrent = (req, res) => {
    const userRole =  req.session.user.role
    const userCart = req.session.user.cart
    res.render("current", { user: req.session.user, roleUser: userRole === "user", roleAdmin: userRole ==="admin" || userRole==="adminMaster"
      , cart: userCart !== null , style: "style.css" });
  };
  

