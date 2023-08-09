import { Router } from "express";
import { userRouter } from "./users.router.mjs";
import { eventRouter } from "./events.router.mjs";
import { profileRouter } from "./profiles.router.mjs";
import getApi from "../controllers/api.controller.mjs";
import "../endpointsDetails.mjs";

const apiRouter: Router = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/events", eventRouter);
apiRouter.use("/profiles", profileRouter);
apiRouter.get("/", getApi);

export { apiRouter };
