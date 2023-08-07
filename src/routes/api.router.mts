import { Router } from "express";
import { sampleIdsRouter } from "./sampleids.router.mjs";
import { userRouter } from "./users.router.mjs";
import { eventRouter } from "./events.router.mjs";
import { profileRouter } from "./profiles.router.mjs";
import getApi from "../controllers/api.controller.mjs";

const apiRouter: Router = Router();

apiRouter.use("/sampleids", sampleIdsRouter)
apiRouter.use("/users", userRouter);
apiRouter.use("/events", eventRouter);
apiRouter.use("/profiles", profileRouter);
apiRouter.get("/", getApi);

export { apiRouter };
