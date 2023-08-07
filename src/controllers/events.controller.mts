import { Request, Response } from "express";
import { EventModel } from "../models/events.model.mjs";
import { ProfileModel } from "../models/profiles.model.mjs";

const getEvents = (req: Request, res: Response) => {
  const topic: any = req.query.topic;
  EventModel.find()
    .then((events) => {
      if (topic) {
        const filteredEvents = events.filter((event) =>
          event.topics.includes(topic)
        );
        res.status(200).json(filteredEvents);
      } else {
        res.status(200).json(events);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

const getEventById = (req: Request, res: Response) => {
  const { id } = req.params;
  EventModel.findById(id.toString())
    .then((event) => {
      res.status(200).send({ event });
    })
    .catch((err) => {
      res.status(404).send({ msg: "Not Found" });
    });
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
    });
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

const updateEvent = (req: Request, res: Response) => {
  const { event_id } = req.params;
  const { profile_id } = req.body;

  if(!profile_id) {
      return res.status(400).send("Please go to your profile settings to change.");
  }
  ProfileModel.findById(profile_id)
  .then(({_id}) => {
    if(_id)
      return EventModel.findById(event_id);
  })
  .then(event => {
    event.attending.push(profile_id);
    return event.save()
  })
  .then(()=> {
    return res.status(201).send("Patched Successfully.")
  })
  .catch(error => {
      console.log(error);
      return res.sendStatus(400);
  });
}
export { getEvents, getEventById, postEvent, deleteEventById, updateEvent };
