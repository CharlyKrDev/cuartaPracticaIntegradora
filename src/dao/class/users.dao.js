import userModel from "../../data/models/user.model.js";
import UserDTO from "../../dto/user.dto.js";

class UsersDAO {
  async getUserByEmail(email) {
    const user = await userModel.findOne({ email }).lean();
    return user ? new UserDTO(user) : null;
  }

  async findUserByOne(id) {
    const user = await userModel.findOne({ _id: id }).lean();
    return user ? new UserDTO(user) : null;
  }

  async createNewUser(newUser) {
    const user = await userModel.create(newUser);
    return new UserDTO(user);
  }

  async updateUserCart(userId, cartId) {
    await userModel.updateOne({ _id: userId }, { cart: cartId });
    const user = await userModel.findById(userId).lean();
    return user ? new UserDTO(user) : null;
  }

  async updateUser(userId, updateData) {
    await userModel.updateOne({ _id: userId }, updateData);
    const user = await userModel.findById(userId).lean();
    return user ? new UserDTO(user) : null;
  }

  async findUserById(userId) {
    const user = await userModel.findById(userId).lean();
    return user ? new UserDTO(user) : null;
  }
}

export default new UsersDAO();