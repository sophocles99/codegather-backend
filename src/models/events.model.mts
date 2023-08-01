import { Schema, model, ObjectId } from "mongoose";
import { UserModel } from "./users.model.mjs";

interface IEvent {
    user_id: ObjectId,
    event_title: string,
    image: string,
    location: number[],
    date_time: Date,
    attending: string[],
    topics: string[],
    description: string,
    size_limit: number,
    participation_group: string[] 
}

const EventSchema = new Schema<IEvent>({
    user_id: { type: Schema.ObjectId, ref: UserModel, required: false },
    event_title: { type: String, required: true },
    image: { type: String, required: false },
    location: { type: [Number, Number], required: true }, //This can be co-ordinates or a string.
    date_time: { type: Date, required: true },
    attending: { type: [String], required: false }, // [{profiles}]
    topics: { type: Array(), required: false }, //[string, string...]
    description: { type: String, required: false },
    size_limit: { type: Number, required: true },
    participation_group: { type: Array(), required: false },
});

export const EventModel = model("Event", EventSchema);
