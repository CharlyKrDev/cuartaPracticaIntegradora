import { Router } from "express";
import { getUsersApi, deleteIdleUsers } from "../../controllers/usersControllers.js";


const userRouterApi = Router();

userRouterApi.get("/",  getUsersApi);


userRouterApi.delete("/", deleteIdleUsers);
export default userRouterApi;
