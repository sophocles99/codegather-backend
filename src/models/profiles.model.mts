import mongoose, { Schema, Types } from "mongoose";
import { UserModel } from "./users.model.mjs";
import { IProfile } from "../interfaces.mjs";

const ProfileSchema = new Schema<IProfile>({
  user_id: { type: Schema.Types.ObjectId, ref: UserModel, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  bio: { type: String, required: false },
  date_of_birth: { type: Date, required: true },
  location: { type: String, required: true },
  avatar: { type: String, required: false },
  coding_languages: { type: Array(), required: false },
  interests: { type: String, required: false },
  host_rating: { type: Number, default: null },
});

export const ProfileModel = mongoose.model("Profile", ProfileSchema);
