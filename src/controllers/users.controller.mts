import { Request, Response } from "express";
import { Types } from "mongoose";
import { UserModel } from "../models/users.model.mjs";
import { ProfileModel } from "../models/profiles.model.mjs";

interface INewUser {
  email: string;
  password: string;
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

interface IReturnedUsers {
  _id: Types.ObjectId;
  email: string;
  password: string;
}

const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        console.log(`User with email ${email} not found`);
        return res.status(401).send({ success: false, user_id: null });
      }
      if (user.password === password) {
        console.log(`User successfully logged in`);
        res.status(200).json({ success: true, user_id: user._id });
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

const getUsers = (req: Request, res: Response) =>
  UserModel.find()
    .then((data: IReturnedUsers[]) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });

const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  UserModel.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

const postUser = (req: Request, res: Response) => {
  const { user } = req.body;
  const { email, password } = user;
  const {
    first_name,
    last_name,
    username,
    gender,
    avatar,
    location,
    date_of_birth,
    coding_languages,
    interests,
    host_ratings,
  } = user;
  const newUser: INewUser = { email, password };
  const newProfile: INewProfile = {
    first_name,
    last_name,
    username,
    gender,
    avatar,
    location,
    date_of_birth,
    coding_languages,
    interests,
    host_ratings,
  };
  let returnedUser = {};
  UserModel.create(newUser)
    .then((data) => {
      returnedUser = data;
      newProfile.user_id = data._id;
      ProfileModel.create(newProfile).then((data) => {
        const returnedProfile = data;
        res.status(200).json({ returnedUser, returnedProfile });
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

const deleteUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  UserModel.findOneAndDelete({ _id: id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

export { loginUser, getUsers, getUserById, postUser, deleteUserById };
