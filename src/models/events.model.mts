import { Schema, model } from "mongoose";
import { UserModel } from "./users.model.mjs";
import { ProfileModel } from "./profiles.model.mjs";
import { IEvent } from "../../types/interfaces.js";

const LocationSchema = new Schema({
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
});

const eventSchema = new Schema<IEvent>({
  profile_id: { type: Schema.ObjectId, ref: ProfileModel, required: true },
  event_title: { type: String, required: true },
  date_time: { type: Date, required: true },
  location: { type: LocationSchema, required: true },
  size_limit: { type: Number, required: true },
  attending: [{ type: Schema.ObjectId, ref: UserModel, required: false }],
  image: { type: String, required: false },
  topics: [{ type: String, required: false }],
  description: { type: String, required: false },
});

export const EventModel = model("Event", eventSchema);
