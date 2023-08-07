import { Model, Schema, model } from "mongoose";
import { IUser } from "../../types/interfaces.js";

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model("User", userSchema);
