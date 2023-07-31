import { Schema, model } from "mongoose";

interface IUser {
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // authentication: {
  //   password: { type: String, required: true, select: false },
  //   salt: { type: String, select: false },
  //   sessionToken: { type: String, select: false },
  // },
});

export const UserModel = model("User", UserSchema);
