import {Router} from "express";
import { getEvents, getEventById, postEvent, deleteEventById, updateEvent, postConfirmationEmail } from "../controllers/events.controller.mjs";

const eventRouter:Router = Router();

eventRouter.get("/", getEvents);
eventRouter.get("/:id", getEventById);
eventRouter.patch("/:event_id", updateEvent);
eventRouter.post("/:id/signup", postConfirmationEmail)
eventRouter.delete("/:id", deleteEventById);
eventRouter.post("/", postEvent);

export {eventRouter}