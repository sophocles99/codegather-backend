import { writeFile } from "fs/promises";
import { URL } from "url";
import db from "../connection.mjs";

import { Types } from "mongoose";
import {
  usersData,
  eventsData,
  profilesData,
} from "../data/developement/index.mjs";

import { UserModel } from "../../models/users.model.mjs";
import { EventModel } from "../../models/events.model.mjs";
import { ProfileModel } from "../../models/profiles.model.mjs";

let sampleUserId = "";
let sampleProfileId = "";
let sampleEventId = "";


interface IProfileData {
  user_id?: Types.ObjectId; //mongoose.Types.ObjectId - different from mongoose.ObjectId and mongoose.Schema.Types.ObjectId
  first_name: string;
  last_name: string;
  username: string;
  date_of_birth: string;
  location: string;
  avatar: string;
  bio: string;
  coding_languages: string[];
  interests: string;
}

interface IEventData {
  user_id?: Types.ObjectId;
  event_title: string;
  image: string;
  location: { lat: number; long: number };
  date_time: string; // will be cast to Date type in database
  attending: Types.ObjectId[];
  topics: string[];
  description: string;
  size_limit: number;
}

const seed = () => {
  console.log("Seeding database...");
  return db
    .dropCollection("users")
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
      sampleUserId = String(data[0]._id);
      const modifiedProfiles = profilesData.map((profile, index) => {
        const newProfile: IProfileData = { ...profile };
        newProfile.user_id = data[index]._id;
        return newProfile;
      });
      const modifiedEvents = eventsData.map((event) => {
        const newEvent: IEventData = { ...event };
        const userIdIndex = Math.floor(Math.random() * data.length);
        newEvent.user_id = data[userIdIndex]._id;
        return newEvent;
      });
      return Promise.all([
        ProfileModel.insertMany(modifiedProfiles).then(
          (data) => (sampleProfileId = String(data[0]._id))
        ),
        EventModel.insertMany(modifiedEvents).then(
          (data) => (sampleEventId = String(data[0]._id))
        ),
      ]);
    })
    .then(() => {
      console.log("Profiles collection created");
      console.log("Events collection created\n");
      db.close();
      return { sampleUserId, sampleProfileId, sampleEventId };
    })
    .catch((e) => {
      console.log(e.message);
    });
};

const __dirname = new URL(".", import.meta.url).pathname;

seed().then((sampleIds) =>
  writeFile(`${__dirname}sampleIds.json`, JSON.stringify(sampleIds))
);

export default seed;
