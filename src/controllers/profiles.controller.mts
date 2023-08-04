import { Request, Response } from "express";
import { Types } from "mongoose";
import { ProfileModel } from "../models/profiles.model.mjs";

interface IReturnedProfiles {
  _id: Types.ObjectId;
  first_name: string;
  last_name: string;
  username: string;
  gender: string;
  avatar: string;
  location: string;
  date_of_birth: Date; // Change the data type to Date
  coding_languages: string[];
  interests: string;
  host_ratings: number;
}

const getProfiles = (req: Request, res: Response) =>
  ProfileModel.find()
    .then((profiles: IReturnedProfiles[]) => {
      res.status(200).send({ profiles });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });

const getProfileById = (req: Request, res: Response) => {
  const { id } = req.params;
  ProfileModel.findById(id.toString())
    .then((profile) => {
      res.status(200).send({ profile });
    })
    .catch((err) => {
      res.status(404).send({ msg: "Not Found" });
    });
};

const patchProfileById = (req: Request, res: Response) => {
  const { profilePatches } = req.body;
  const profileId = req.params.id;
  ProfileModel.findOneAndUpdate(
    { _id: profileId },
    { ...profilePatches },
    { new: true }
  ).then((profile) => {
    res.status(200).send({ profile });
  });
};

// For reference in case we make a deleteProfile endpoint
// const deleteEventById = (req: Request, res: Response) => {
//   const { id } = req.params;
//   EventModel.findOneAndDelete({ _id: id })
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.sendStatus(400);
//     });
// };

export { getProfiles, getProfileById, patchProfileById };