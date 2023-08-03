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

interface INewEvent {
  user_id?: Types.ObjectId; //mongoose.Types.ObjectId - different from Schema.Types.ObjectId
  event_title: string;
  image: string;
  location: number[];
  date_time: string; // will be cast to Date type in database
  attending: Types.ObjectId[];
  topics: string;
  description: string;
  size_limit: number;
  participation_group: string;
}

interface INewProfile {
  user_id?: Types.ObjectId;
  first_name: string;
  last_name: string;
  username: string;
  gender: string;
  avatar: string;
  location: string;
  date_of_birth: string;
  coding_languages: string[];
  interests: string;
  host_ratings: number;
}

const seed = () => {
  console.log("Seeding database...");
  return db.dropCollection("users")
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
      const modifiedProfiles = profilesData.map((profile) => {
        const newProfile: INewProfile = { ...profile };
        const userIdIndex = Math.floor(Math.random() * data.length);
        newProfile.user_id = data[userIdIndex]._id;
        return newProfile;
      });
      const modifiedEvents = eventsData.map((event) => {
        const newEvent: INewEvent = { ...event };
        const userIdIndex = Math.floor(Math.random() * data.length);
        newEvent.user_id = data[userIdIndex]._id;
        return newEvent;
      });
      return Promise.all([
        ProfileModel.insertMany(modifiedProfiles),
        EventModel.insertMany(modifiedEvents),
      ]);
    })
    .then(() => {
      console.log("Profiles collection created");
      console.log("Events collection created\n");
      db.close();
    })
    .catch((e) => {
      console.log(e.message);
    });
};

seed();

export default seed;
