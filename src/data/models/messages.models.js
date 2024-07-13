import mongoose from "mongoose";

const messagesCollection = "messages";

const messagesSchema = new mongoose.Schema({
  user: { type: String, required: true },
  messages: {
    type: [String],
    required: true,
    default: [],
    dateContact: {
      type: Date,
      default: Date.now,
    },
  },
});

const messagesModel = mongoose.model(messagesCollection, messagesSchema);

export default messagesModel;
