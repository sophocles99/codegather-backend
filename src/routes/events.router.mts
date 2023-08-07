import {Router} from "express";
import { getEvents, getEventById, postEvent, deleteEventById, updateEvent } from "../controllers/events.controller.mjs";

const eventRouter:Router = Router();

eventRouter.get("/", getEvents);
eventRouter.get("/:id", getEventById);
eventRouter.post("/", postEvent);
eventRouter.delete("/:id", deleteEventById);
eventRouter.patch("/:event_id", updateEvent);
export {eventRouter}