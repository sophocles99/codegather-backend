export interface IUser {
  _id?: Types.ObjectId
  email: string;
  password: string;
}

export interface IProfile {
  user_id?: Types.ObjectId;
  first_name: string;
  last_name: string;
  username: string;
  date_of_birth: Date | string;
  location: string;
  avatar: string;
  bio: string;
  coding_languages: string[];
  interests: string;
  host_rating?: number;
}

export interface IEvent {
  profile?: Types.ObjectId;
  event_title: string;
  image: string;
  location: { lat: number; long: number };
  date_time: Date | string;
  attending: Types.ObjectId[];
  topics: string[];
  description: string;
  size_limit: number;
}
