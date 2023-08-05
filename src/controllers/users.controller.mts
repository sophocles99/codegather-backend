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
        return res.status(401).send({ success: false, user_id: null });
      }
      if (user.password === password) {
        res.status(200).send({ success: true, user_id: user._id });
      } else {
        res.status(401).send({ success: false, user_id: null });
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

const createUser = (req: Request, res: Response) => {
  const { user } = req.body;
  const {
    email,
    password,
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
  UserModel.create(newUser)
    .then((data) => {
      newProfile.user_id = data._id;
      return ProfileModel.create(newProfile);
    })
    .then((data) => {
      res.status(201).send({
        success: true,
        msg: "New user and profile created",
        user_id: data.user_id,
        profile_id: data._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000 && err.keyValue.email) {
        return res.status(409).send({
          success: false,
          msg: "Email already in use",
          user_id: null,
          profile_id: null,
        });
      }
      if (err.code === 11000 && err.keyValue.username) {
        UserModel.findByIdAndDelete(newProfile.user_id)
        return res.status(409).send({
          success: false,
          msg: "Username already in use",
          user_id: null,
          profile_id: null,
        });
      }
      res.sendStatus(400);
    });
};

const getUsers = (req: Request, res: Response) =>
  UserModel.find()
    .then((users: IReturnedUsers[]) => {
      res.status(200).send({ users });
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

export { loginUser, createUser, getUsers, getUserById, deleteUserById };
