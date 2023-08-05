import { Schema, model, ObjectId } from "mongoose";
import { UserModel } from "./users.model.mjs";
import { IEvent } from "../interfaces.mjs";

const EventSchema = new Schema<IEvent>({
  user_id: { type: Schema.ObjectId, ref: UserModel, required: false },
  event_title: { type: String, required: true },
  image: { type: String, required: false },
  location: { type: { lat: Number, long: Number }, required: true },
  date_time: { type: Date, required: true },
  attending: { type: [Schema.ObjectId], ref: UserModel, required: false }, // [{profiles}]
  topics: { type: Array(), required: false }, //[string, string...]
  description: { type: String, required: false },
  size_limit: { type: Number, required: true },
});

export const EventModel = model("Event", EventSchema);
