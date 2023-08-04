import {Router} from "express";
import { getProfiles, getProfileById } from "../controllers/profiles.controller.mjs";

const profileRouter:Router = Router();

profileRouter.get("/", getProfiles)
profileRouter.get("/:id", getProfileById)

export {profileRouter}