import { Schema, model } from "mongoose";
import { IUser } from "../../types/interfaces.js";

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model("User", UserSchema);
