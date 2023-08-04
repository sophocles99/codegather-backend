import cors from "cors";
import express, { Express, Request, Response } from "express";
import "./db/connection.mjs";
import { apiRouter } from "./routes/api.router.mjs";
import { noRouteFound } from "./controllers/events.controller.mjs";

const app: Express = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.get("/", (req: Request, res: Response)=> {
  res.status(200).send("WELCOME TO CODEGATHERS API \n Start with this end point '/api' ");
})

app.all('*', noRouteFound)

export default app