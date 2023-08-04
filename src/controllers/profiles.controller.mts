import { Request, Response } from "express";
import { Types } from "mongoose";
import { ProfileModel } from "../models/profiles.model.mjs";

// const getProfiles = (req: Request, res: Response) => {
//   const topic: any = req.query.topic;
//   ProfileModel.find()
//     .then((events) => {
//       const filteredEvents = events.filter((event) =>
//         event.topics.includes(topic)
//       );
//       res.status(200).json(filteredEvents);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.sendStatus(400);
//     });
// };

interface IReturnedProfiles {
    _id: Types.ObjectId;
    first_name: string,
    last_name: string,
    username: string,
    gender: string,
    avatar: string,
    location: string,
    date_of_birth: Date, // Change the data type to Date
    coding_languages: string[],
    interests: string,
    host_ratings: number,
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
// const getEventById = (req: Request, res: Response) => {
//   const { id } = req.params;
//   EventModel.findById(id.toString())
//     .then((event) => {
//       res.status(200).send({ event });
//     })
//     .catch((err) => {
//       res.status(404).send({ msg: "Not Found" });
//     });
// };

// const postEvent = (req: Request, res: Response) => {
//   const { event } = req.body;
//   EventModel.create(event)
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.sendStatus(400);
//     });
// };

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

export { getProfiles, noRouteFound };
