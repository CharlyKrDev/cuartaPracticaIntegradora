import { Router } from "express";
import passport from "passport";
import {
  githubAuthApi,
  githubCallbackApi,
  loginApi,
  registerApi,
  failLoginApi,
  failRegisterApi,
  logoutApi,
} from "../../controllers/authControllers.js";

const router = Router();
router.get(
  "/github",
  passport.authenticate("github", { scope: "user.email" }),
  githubAuthApi
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  githubCallbackApi
);

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "failregister" }),
  registerApi
);

router.get("/failregister", failRegisterApi);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "faillogin" }),
  loginApi
);

router.get("/faillogin", failLoginApi);

router.post("/logout", logoutApi);

export default router;
