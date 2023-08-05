import mongoose, { Schema, ObjectId } from "mongoose";
import { UserModel } from "./users.model.mjs";

interface IProfile {
  user_id: ObjectId;
  first_name: string;
  last_name: string;
  username: string;
  date_of_birth: Date;
  location: string;
  avatar: string;
  bio: string;
  coding_languages: string[];
  interests: string;
  host_rating: number;
}
const ProfileSchema = new mongoose.Schema<IProfile>({
  user_id: { type: Schema.ObjectId, ref: UserModel, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  date_of_birth: { type: Date, required: true },
  location: { type: String, required: true },
  avatar: { type: String, required: false },
  bio: { type: String, required: false },
  coding_languages: { type: Array(), required: false },
  interests: { type: String, required: false },
  host_rating: { type: Number, default: null },
});

export const ProfileModel = mongoose.model("Profile", ProfileSchema);
