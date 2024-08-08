import { createHash, isValidPassword } from "../utils.js";
import UsersDAO from '../dao/class/users.dao.js';
import CartsDAO from "../dao/class/carts.dao.js";
import logger from "../config/loggerConfig.js";

export const registerPassportController = async (req, username, password, done) => {
  const { first_name, last_name, email, age } = req.body;
  try {
    let user = await UsersDAO.getUserByEmail(username);
    if (user) {
      console.log("El usuario ya existe");
      return done(null, false);
    }

    let newCart = await CartsDAO.createCart({ products: [] });

    const newUser = {
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
      cart: newCart.id
    };

    let result = await UsersDAO.createNewUser(newUser);
    logger.info(`Usuario creado correctamente email: ${newUser.email}`);
    return done(null, result);
  } catch (error) {
    logger.error(`Error al crear usuario ${newUser.email} `)
    return done("Error al obtener el usuario: " + error);
  }
};

export const passportGithubController = async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await UsersDAO.getUserByEmail(profile._json.email);
    if (!user) {
      let newCart = await CartsDAO.createCart({ products: [] });

      let newUser = {
        first_name: profile._json.name,
        last_name: "",
        age: 28,
        email: profile._json.email,
        password: "",
        role: "user",
        cart: newCart.id
      };

      let result = await UsersDAO.createNewUser(newUser);
      logger.info(`Cuanta vinculada con gitHub de forma correcta: ${newUser.email}`);

      done(null, result);
    } else {
      if (!user.cart) {
        let newCart = await CartsDAO.createCart();

        await UsersDAO.updateUserCart(user.id, newCart.id);
      }
      done(null, user);
    }
  } catch (error) {
    logger.error(`Error al vincular gitHub cuenta: ${newUser.email} `)

    done(error);
  }
};

export const loginPassportController = async (username, password, done) => {
  try {
    const user = await UsersDAO.getUserByEmail(username);
    if (!user) {
      logger.warning(`El usuario: ${username} no existe`)
      return done(null, false);
    }

    if (!user.cart) {
      const newCart = await CartsDAO.createCart();
      await UsersDAO.updateUserCart(user._id, newCart._id);
      const updatedUser = await UsersDAO.findUserById(user._id);

      if (!isValidPassword(updatedUser, password)) {
        logger.error(`Acceso erróneo por datos inválidos del ${user.id}`)

        return done(null, false);
      }
      return done(null, updatedUser);
    }

    if (!isValidPassword(user, password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

