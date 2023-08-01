import { Router } from "express";
import { userRouter } from "./users.router.mjs";
import { eventRouter } from "./events.router.mjs";

const apiRouter: Router = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/events", eventRouter);

export { apiRouter };
