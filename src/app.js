import express from "express";
import { viewsPath, publicPath, swaggerOptions} from "./utils/utils.js";
import { hbs } from "./utils/functions/handlebars.js";
import { dashboardProductsRouter } from "./routes/dashboardProductsRouter.js";
import { homeRouter } from "./routes/homeRouters.js";
import cartsRouterM from "./routes/cartsRouter.js";
import { Server } from "socket.io";
import socketIOExpressSession from "socket.io-express-session";
import { messagesRouter } from "./routes/messagesRouters.js";
import { socketConnection } from "./connection/handleSockets.js";
import { messagesConnection } from "./connection/messagesSockets.js";
import cartsRouterApiM from "./routes/api/cartsRouterApi.js";
import { productsRouterApi } from "./routes/api/productsRoutersApi.js";
import { mongoServer } from "./config/database.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import sessionsApiRouter from "./routes/api/sessionsRoutersApi.js";
import registerRouter from "./routes/registerRouters.js";
import sessionsRouter from "./routes/sessionsRouters.js";
import { resetPassRouter } from "./routes/resetPasswordRouter.js";
import mockerProductsApi from "./routes/api/mockerProductsApi.js"
import errorHandler from "./middleware/indexErrors.js";
import { managerRoleApi } from "./routes/api/managerRoleRouterApi.js";
import logger from "./config/loggerConfig.js";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUiExpress from "swagger-ui-express"
import { productsRouterTest } from "./routes/test/productsRoutersTest.js";
import cartsRouterTest from "./routes/test/cartsRouterTest.js";
import sessionsRouterTest from './routes/test/sessionsRoutersTest.js'
import userRouterApi from "./routes/api/usersRourterApi.js";
export const app = express();
const PORT = 8080;
const httpServer = app.listen(
  PORT,
  logger.info(`Server running on port: https://proyectofinalbackend-2024.up.railway.app/products`)
);
const socketServer = new Server(httpServer);

app.set("views", viewsPath);
app.enable("view cache");
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Configuración de la sesión
const sessionMiddleware = session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: mongoServer,
  }),
});

// Usar la configuración de sesión en Express
app.use(sessionMiddleware);

// Integrar la sesión de Express con Socket.IO usando el mismo middleware
socketServer.use(socketIOExpressSession(sessionMiddleware, {
  autoSave: true,
}));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// APIs

app.use("/api/sessions", sessionsApiRouter);
app.use("/api/carts", cartsRouterApiM);
app.use("/api/products", productsRouterApi);
app.use("/api/mockingproducts", mockerProductsApi)
app.use("/", managerRoleApi )
app.use("/api/users", userRouterApi )


// Tests

app.use("/test/sessions", sessionsRouterTest);
app.use("/test/carts", cartsRouterTest);
app.use("/test/products", productsRouterTest);

// Views
app.use("/carts", cartsRouterM);
app.use("/dashBoardProducts", dashboardProductsRouter);
app.use("/messages", messagesRouter);
app.use("/", homeRouter);
app.use("/", registerRouter);
app.use("/sessions", sessionsRouter);
app.use("/", resetPassRouter);

app.use(errorHandler);

// Documentación API
const specs =swaggerJSDoc(swaggerOptions);
app.use("/api/docs", SwaggerUiExpress.serve, SwaggerUiExpress.setup(specs))


socketConnection(socketServer);
messagesConnection(socketServer);
