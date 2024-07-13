import MessagesDAO from "../dao/class/messages.dao.js";

export const connectionMessages = (socketServer) => async (socket) => {
    try {
        socket.on("message", async ({ message, user }) => {
          if (!message || !user) {
            return;
          }

          // Agregar la fecha al mensaje
          const messageWithDate = `${message} - ${new Date().toLocaleString()}`;

          const existingUser = await MessagesDAO.existingUser(user);
          if (existingUser) {
            existingUser.messages.push(messageWithDate);
            await existingUser.save();
            socketServer.emit('message', existingUser.messages);
          } else {
            const newUser = await MessagesDAO.createMessages(user, messageWithDate);
            socketServer.emit('message', newUser.messages);
          }
        });
      } catch (error) {
        console.error("Error al cargar mensaje del cliente:", error);
        socket.emit("error", { message: "Error al procesar la solicitud" });
      }
};
