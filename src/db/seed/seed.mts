import { writeFile } from "fs/promises";
import { URL } from "url";
import db from "../connection.mjs";

import { Types } from "mongoose";
import {
  usersData,
  eventsData,
  profilesData,
} from "../data/development/index.mjs";

import { UserModel } from "../../models/users.model.mjs";
import { EventModel } from "../../models/events.model.mjs";
import { ProfileModel } from "../../models/profiles.model.mjs";
import { IProfile, IEvent } from "../../../types/interfaces.js";

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
    .then((newUsers) => {
      console.log("Users collection created");
      sampleUserId = String(newUsers[0]._id);
      const modifiedProfiles = profilesData.map((profile, index) => {
        const newProfile: IProfile = { ...profile };
        newProfile.user_id = newUsers[index]._id;
        return newProfile;
      });
      return ProfileModel.insertMany(modifiedProfiles);
    })
    .then((newProfiles) => {
      console.log("Profiles collection created");
      sampleProfileId = String(newProfiles[0]._id);
      const modifiedEvents = eventsData.map((event) => {
        const newEvent: IEvent = { ...event };
        const profileIdIndex = Math.floor(Math.random() * newProfiles.length);
        newEvent.profile_id = newProfiles[profileIdIndex]._id;
        return newEvent;
      });
      return EventModel.insertMany(modifiedEvents);
    })
    .then((newEvents) => {
      console.log("Events collection created\n");
      sampleEventId = String(newEvents[0]._id);
    })
    .then(() => {
      db.close();
      return { sampleUserId, sampleProfileId, sampleEventId };
    })
    .catch((e) => {
      console.log(e.message);
    });
};

const __dirname = new URL(".", import.meta.url).pathname;

seed().then((sampleIds) =>
  writeFile(
    `${__dirname}sampleIds.js`,
    "export default " + JSON.stringify(sampleIds)
  )
);

export default seed;
