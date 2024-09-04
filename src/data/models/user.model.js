import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", default: null },
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
  role: { type: String, default: "user" },
  resetPasswordToken: String,
  resetTokenExpiration: Date,
  documents: [{ name: String, reference: String }],
  last_connection:String
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
