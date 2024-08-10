import productsDAO from "../dao/class/products.dao.js";
import usersDAO from "../dao/class/users.dao.js";
import logger from "../config/loggerConfig.js";

export const handleConnection = async (socket) => {
  const userEmail = socket.handshake.session.user.email;
  logger.info(`New client connected to socket: ${userEmail}`);

  try {
    const user = await usersDAO.getUserByEmail(userEmail);
    if (user.role === "admin" || user.role === "adminMaster") {
      const products = await productsDAO.findProducts();
      socket.emit("currentProducts", products);
    }

    if (user.role === "premium") {
      const products = await productsDAO.findProducts();

      const productsOwner = products.filter(
        (product) => product.owner === userEmail
      );
      socket.emit("currentProducts", productsOwner);
    }
  } catch (error) {
    console.error("Error al enviar productos al cliente:", error);
    socket.emit("error", { message: "Error al procesar la solicitud" });
  }
};

export const handleAddProduct = async (socketServer, socket, newProduct) => {
  const userEmail = socket.handshake.session.user.email;

  try {
    const user = await usersDAO.getUserByEmail(userEmail);

    if (
      newProduct.status !== true &&
      newProduct.status !== false &&
      newProduct.status !== undefined
    ) {
      newProduct.status = true;
    }
    await productsDAO.createProduct(newProduct);
    if (user.role === "admin" || user.role === "adminMaster") {
      const products = await productsDAO.findProducts();
      socketServer.emit("updateProducts", products);
    }

    if (user.role === "premium") {
      const products = await productsDAO.findProducts();

      const productsOwner = products.filter(
        (product) => product.owner === userEmail
      );
      socketServer.emit("updateProducts", productsOwner);
    }
  } catch (error) {
    console.error("Error al agregar producto:", error);
    socket.emit("error", { message: "Error al agregar producto" });
  }
};

export const handleDeleteProduct = async (
  socketServer,
  socket,
  productId,
  email
) => {
  const userEmail = email
  try {
    const user = await usersDAO.getUserByEmail(email);
    const product = await productsDAO.getProductById(productId);
    // Validación de la existencia del usuario y producto
    if (!user) {
      return socket.emit("error", { message: "El usuario no existe" });
    }
    if (!product) {
      return socket.emit("error", { message: "El producto no existe" });
    }

    if (
      user.role === "admin" ||
      user.role === "premium" ||
      user.role === "adminMaster"
    ) {
      if (user.email === product.owner || user.role === "admin") {
        await productsDAO.deleteProductById(productId);
        if (user.role === "premium") {
          const products = await productsDAO.findProducts();

          const productsOwner = products.filter(
            (product) => product.owner === userEmail
          );
          socketServer.emit("updateProducts", productsOwner);
        }

        if (user.role === "admin" || user.role === "adminMaster") {
          const updatedProducts = await productsDAO.findProducts();
          socketServer.emit("updateProducts", updatedProducts);
        }
      } else {
        socket.emit("error", {
          message:
            "Si no eres el owner de este producto, solo un admin lo puede borrar.",
        });
      }
    }
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    socket.emit("error", { message: "Error al eliminar producto" });
  }
};
