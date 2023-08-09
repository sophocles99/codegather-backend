import { Request, Response } from "express";
import { UserModel } from "../models/users.model.mjs";
import { ProfileModel } from "../models/profiles.model.mjs";
import { IUser, IProfile } from "../../types/interfaces.js";

const createUser = (req: Request, res: Response) => {
  const { user } = req.body;
  const {
    email,
    password,
    first_name,
    last_name,
    username,
    date_of_birth,
    location,
    avatar,
    bio,
    coding_languages,
    interests,
  } = user;
  UserModel.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Error("Email already in use");
      }
      return ProfileModel.findOne({ username }).then((profile) => {
        if (profile) {
          throw new Error("Username already in use");
        }
      });
    })
    .then(() => {
      const newUser: IUser = { email, password };
      const newProfile: IProfile = {
        first_name,
        last_name,
        username,
        date_of_birth,
        location,
        avatar,
        bio,
        coding_languages,
        interests,
      };
      UserModel.create(newUser)
        .then((data: IUser) => {
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
        });
    })
    .catch((err) => {
      if (err.message === "Email already in use") {
        return res.status(409).send({
          success: false,
          msg: "Email already in use",
          user_id: null,
          profile_id: null,
        });
      }
      if (err.message === "Username already in use") {
        return res.status(409).send({
          success: false,
          msg: "Username already in use",
          user_id: null,
          profile_id: null,
        });
      }
      console.log(err);
      res.status(400).send({ success: false, msg: err });
    });
};

const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          success: false,
          msg: "Invalid login details",
          user_id: null,
        });
      }
      user.comparePassword(password).then((result) => {
        if (result) {
          ProfileModel.findOne({ user_id: user._id }).then((profile) => {
            res.status(200).send({
              success: true,
              msg: "User logged in",
              user_id: user._id,
              profile_id: profile._id,
            });
          });
        } else {
          res.status(401).send({
            success: false,
            msg: "Invalid login details",
            user_id: null,
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

const getUsers = (req: Request, res: Response) =>
  UserModel.find()
    .then((users: IUser[]) => {
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

const patchUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req.body;
  const { email, password } = user;
  console.log(id, user, email, password)
  if (!email && !password) {
    return res.status(400).send({
      success: false,
      msg: "Patch req must contain email and/or password",
    });
  }
  const update: { email?: string; password?: string } = {};
  if (email) update.email = email;
  if (password) update.password = password;
  UserModel.findById(id)
    .then((userFound) => {
      console.log(userFound)
      if (email) {
        userFound.email = email;
      }
      if (password) {
        userFound.password = password;
      }
      return userFound.save();
    })
    .then((userUpdated) => {
      return res
        .status(200)
        .send({ success: true, msg: "User updated", user: userUpdated });
    })
    .catch((e) => {
      console.log(e);
      return res.status(400).send({ success: false, msg: e.message });
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

export {
  loginUser,
  createUser,
  getUsers,
  getUserById,
  deleteUserById,
  patchUserById,
};
