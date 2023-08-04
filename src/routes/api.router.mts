import { Router } from "express";
import { userRouter } from "./users.router.mjs";
import { eventRouter } from "./events.router.mjs";
import endpointsList from "../endpointsList.mjs";
function displayEndpoints (req, res, next){
    res.send(endpointsList)
}

const apiRouter: Router = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/events", eventRouter);
apiRouter.use("*", displayEndpoints);

export { apiRouter };
