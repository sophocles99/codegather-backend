import { Schema, model } from "mongoose";
import { UserModel } from "./users.model.mjs";
import { IProfile } from "../../types/interfaces.js";

const profileSchema = new Schema<IProfile>({
  user_id: { type: Schema.Types.ObjectId, ref: UserModel, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  date_of_birth: { type: Date, required: true },
  location: { type: String, required: true },
  avatar: { type: String, required: false },
  bio: { type: String, required: false },
  coding_languages: [{ type: String, required: false }],
  interests: { type: String, required: false },
  host_rating: { type: Number, default: null },
});

export const ProfileModel = model("Profile", profileSchema);
