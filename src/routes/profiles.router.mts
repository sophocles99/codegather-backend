import {Router} from "express";
import { getProfiles } from "../controllers/profiles.controller.mjs";

const profileRouter:Router = Router();

profileRouter.get("/", getProfiles)

export {profileRouter}