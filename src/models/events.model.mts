import { Schema, model } from "mongoose";

interface IEvent {
    user_id: string,
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
    user_id: { type: String, required: true },
    event_title: { type: String, required: true },
    image: { type: String, required: false },
    location: { type: [Number, Number], required: true }, //This can be co-ordinates or a string.
    date_time: { type: Date, required: true },
    attending: { type: [String], required: false }, // [{profiles}]
    topics: { type: [], required: false }, //[string, string...]
    description: { type: String, required: false },
    size_limit: { type: Number, required: true },
    participation_group: { type: [], required: false },
});

export const EventModel = model("Event", EventSchema);
