import { Request, Response } from "express";
import { EventModel } from "../models/events.model.mjs";

const getEvents = (req: Request, res: Response) =>
  EventModel.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    })

const getEventById = (req: Request, res: Response) => {
  const { id } = req.params;
  EventModel.findById( id.toString() )
  .then((event) => {
    res.status(200).send({event});
  })
  .catch((err) => {
    console.log('Inside catch of getEventById');
    res.status(404).send({msg:"Not Found"});
    })
};

const postEvent = (req: Request, res: Response) => {
  const { event } = req.body;
  EventModel.create(event)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    })
};

const deleteEventById = (req: Request, res: Response) => {
  const { id } = req.params;
  EventModel.findOneAndDelete({ _id: id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

const noRouteFound = (req: Request, res: Response) => {
  res.status(400).send({msg: "Bad Request"});
}

export { getEvents, getEventById, postEvent, deleteEventById, noRouteFound };
