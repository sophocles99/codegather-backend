import { Router } from "express";
import { getSampleIds } from "../controllers/sampleids.controller.mjs";

const sampleIdsRouter: Router = Router();

sampleIdsRouter.get("/", getSampleIds);

export { sampleIdsRouter };
