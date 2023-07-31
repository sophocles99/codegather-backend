import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString: string = process.env.MONGO_URI;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("Error connectinf to MongoDB:", err));
