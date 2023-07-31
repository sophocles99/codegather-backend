import { Router } from "express";
import { userRouter } from "./users.router.mjs";

const apiRouter: Router = Router();

apiRouter.use("/users", userRouter);

export { apiRouter };