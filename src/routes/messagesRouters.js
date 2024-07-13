import express from "express";
import { isAuthenticated, isUser } from "../middleware/auth.js";
import { renderMessages } from "../controllers/messagesController.js";

export const messagesRouter = express.Router();

messagesRouter.get("/",isAuthenticated, isUser, renderMessages);