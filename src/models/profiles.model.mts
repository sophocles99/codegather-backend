import mongoose, { Schema, ObjectId } from "mongoose";
import { UserModel } from "./users.model.mjs";

interface IProfile {
    user_id: ObjectId,
    first_name: string,
    last_name: string,
    username: string,
    gender: string,
    event_title: string,
    avatar: string,
    location: number[],
    date_of_birth: Date,
    coding_languages: string[],
    interests: string,
    host_ratings: number
}
const ProfileSchema = new mongoose.Schema<IProfile>({
    user_id: { type: Schema.ObjectId, ref:UserModel, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true },
    gender: { type: String, required: false },
    event_title: { type: String, required: true },
    avatar: { type: String, required: false },
    location: { type: Array(2), required: true }, //This can be co-ordinates or a string.
    date_of_birth: { type: Date, required: true },
    coding_languages: { type: Array(), required: false },
    interests: { type: String, required: false },
    host_ratings: { type: Number, required: true }
});

export const ProfileModel = mongoose.model('Profile', ProfileSchema);
