import db from "../connection.mjs";
import { ObjectId } from "mongoose";
import {
  usersData,
  eventsData,
  profilesData,
} from "../data/developement/index.mjs";
import { UserModel } from "../../models/users.model.mjs";
import { EventModel } from "../../models/events.model.mjs";
import { ProfileModel } from "../../models/profiles.model.mjs";

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
    return db.dropCollection("profiles");
  })
  .then(() => {
    return UserModel.insertMany(usersData);
  })
  .then((data) => {
    console.log("Users collection created");
    const modifiedEvents = eventsData.map((eventObj) => {
      const newEventObj = { ...eventObj };
      const userIdIndex = Math.floor(Math.random() * data.length);
      newEventObj.user_id = data[userIdIndex]._id;
      return newEventObj;
    });
    const modifiedProfiles = profilesData.map((profileObj) => {
      const newProfileObj = { ...profileObj };
      const userIdIndex = Math.floor(Math.random() * data.length);
      newProfileObj.user_id = data[userIdIndex]._id;
      return newProfileObj;
    });
    return Promise.all([
      EventModel.insertMany(modifiedEvents),
      ProfileModel.insertMany(modifiedProfiles),
    ]);
  })
  .then(() => {
    console.log("Events collection created");
    console.log("Profiles collection created");
    db.close();
  })
  .catch((e) => {
    console.log(e.message);
  });
