import {Router} from "express";
import { getProfiles, getProfileById, patchProfileById } from "../controllers/profiles.controller.mjs";

const profileRouter:Router = Router();

profileRouter.get("/", getProfiles)
profileRouter.get("/:id", getProfileById)
profileRouter.patch("/:id", patchProfileById)

export {profileRouter}