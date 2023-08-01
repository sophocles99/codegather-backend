import db from "../connection.mjs";
import { ObjectId } from "mongoose";
import {
  usersData,
  eventsData,
  profilesData,
} from "../data/developement/index.mjs";
import { UserModel } from "../../models/users.model.mjs";
import { EventModel } from "../../models/events.model.mjs";

interface IEvent {
  user_id?: ObjectId;
  event_title: string;
  image: string;
  location: number[];
  date_time: Date;
  attending: ObjectId[];
  topics: string[];
  description: string;
  size_limit: number;
  participation_group: string[];
}

db.dropCollection("users")
  .then(() => {
    return db.dropCollection("events");
  })
  .then(() => {
    return UserModel.insertMany(usersData);
  })
  .then((data) => {
    console.log("Users collection created");
    eventsData.forEach((eventObj) => {
      const userIdIndex = Math.floor(Math.random() * data.length);
      eventObj.user_id = data[userIdIndex]._id;
      const event = EventModel(eventObj);
      event.save();
    });
  })
  .catch((e) => {
    console.log(e);
  });
