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
    console.log(profile)
    res.status(200).send({ profile });
  });
};
// ProfileModel.findById(req.params.id).then((profile) => {
//   if (profile == null) {
//     return res.status(404).send({ message: "Cannot find profile" });
//   }
// res.profile = profile;
// next();
//   if (req.body.first_name != null) res.profile.first_name = req.body.first_name;
//   if (req.body.last_name != null) res.profile.last_name = req.body.last_name;
//   if (req.body.gender != null) res.profile.gender = req.body.gender;
//   if (req.body.avatar != null) res.profile.avatar = req.body.avatar;
//   if (req.body.location != null) res.profile.location = req.body.location;
//   if (req.body.coding_languages != null)
//     res.profile.coding_languages = req.body.coding_languages;
//   if (req.body.interests != null) res.profile.interests = req.body.interests;
//   return res.profile
//     .save()
//     .then((updatedProfile) => {
//       return res.json(updatedProfile);
//     })
//     .catch((err) => res.status(400).json({ message: err.message }));
// };

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

const noRouteFound = (req: Request, res: Response) => {
  res.status(400).send({ msg: "Bad Request" });
};

export { getProfiles, noRouteFound, getProfileById, patchProfileById };
