import { Request, Response } from "express";
import { UserModel } from "../models/users.model.mjs";

const getUsers = (req: Request, res: Response) =>
  UserModel.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    })

const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  UserModel.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({"mongoDB connection string": process.env.MONGO_URI, "error": err });
    })
};

const postUser = (req: Request, res: Response) => {
  const { user } = req.body;
  UserModel.create(user)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    })
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

export { getUsers, getUserById, postUser, deleteUserById };
