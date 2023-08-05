import { Types } from "mongoose";

// Users
export default interface IUser {
  email: string;
  password: string;
}

export interface IReturnedUsers {
  _id: Types.ObjectId;
  email: string;
  password: string;
}

// Profiles
export interface INewProfile {
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

export interface IProfile {
  user_id: Types.ObjectId;
  first_name: string;
  last_name: string;
  username: string;
  bio: string;
  date_of_birth: Date;
  location: string;
  avatar: string;
  coding_languages: string[];
  interests: string;
  host_rating: number;
}

// Events
export interface IEvent {
  user_id: Types.ObjectId;
  event_title: string;
  image: string;
  location: { lat: number; long: number };
  date_time: Date;
  attending: Types.ObjectId[];
  topics: string[];
  description: string;
  size_limit: number;
}
