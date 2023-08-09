import mongoose from "mongoose";
import { URL } from "url";
import dotenv from "dotenv";

const __dirname = new URL(".", import.meta.url).pathname;
const ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: `${__dirname}/../../.env.${ENV}`,
});

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI not set");
}

const connectionString: string = process.env.MONGO_URI;
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("Error connecting to MongoDB:", err));
export default mongoose.connection;