import mongoose from 'mongoose';
import dotenv from "dotenv";
import logger from './loggerConfig.js';
dotenv.config();
export const mongoServer = process.env.MONGO_URL;
mongoose
  .connect(mongoServer)
  .then(() => {
    logger.info("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    logger.info('Connected to MongoDB');
});



export default db;
