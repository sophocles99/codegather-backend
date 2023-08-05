import { Schema, model } from "mongoose";
import IUser from "../interfaces.mjs";

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model("User", UserSchema);
