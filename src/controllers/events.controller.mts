import nodemailer from "nodemailer";
import { Request, Response } from "express";
import { UserModel } from "../models/users.model.mjs";
import { ProfileModel } from "../models/profiles.model.mjs";
import { EventModel } from "../models/events.model.mjs";

const getEvents = (req: Request, res: Response) => {
  const topic: any = req.query.topic;
  EventModel.find()
    .populate("profile")
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
  EventModel.findById(id)
    .populate("profile")
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
    .then((event) => {
      res.status(200).send({
        success: true,
        msg: "New event is created",
        event_id: event._id,
      });
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

  ProfileModel.findById(profile_id)
    .then((profile) => {
      if (!profile) {
        throw new Error("Profile not found");
      }
      return EventModel.findById(event_id);
    })
    .then((event) => {
      if (!event) {
        throw new Error("Event not found");
      }
      if (event.attending.includes(profile_id)) {
        throw new Error("The user is already in the attending list.");
      } else {
        event.attending.push(profile_id);
        return event.save();
      }
    })
    .then((event) => {
      res.status(200).send({
        success: true,
        msg: "Profile_id added to event attending array",
        event_id: event._id,
      });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(400).send({
        success: false,
        msg: error.message,
      });
    });
};

const postConfirmationEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {profileId} = req.body.test
  let config = {
    service: "gmail",
    auth: {
      user: "codegather101@gmail.com",
      pass: "iqtgnawlhpicgxdi",
    },
  };

  EventModel.findById(id).then((event) => {
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    ProfileModel.findById(profileId)
      .then((profile) => {
        return UserModel.findById(profile.user_id);
      })
      .then((user) => {
        const { email } = user;
        let transporter = nodemailer.createTransport(config);
        const message = {
          from: "codegather101@gmail.com",
          to: email,
          subject: "Event Registration Confirmation",
          html: `<p>Successfully registered for ${event.event_title} event.</p>`,
        };
        transporter
          .sendMail(message)
          .then((info) => {
            return res.status(201).json({
              msg: "Confirmation email sent successfully",
              info: info.messageId,
              preview: nodemailer.getTestMessageUrl(info),
            });
          })
          .catch((error) => {
            console.error("Error sending email:", error);
            return res.status(500).json({ error: "Error sending email" });
          });
      })
      .catch((error) => {
        console.error("Error finding event:", error);
        return res.status(500).json({ error: "Error finding event" });
      });
  });
};

export {
  getEvents,
  getEventById,
  postEvent,
  deleteEventById,
  updateEvent,
  postConfirmationEmail,
};
