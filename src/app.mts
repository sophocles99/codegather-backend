import cors from "cors";
import express, { Express, Request, Response } from "express";
import "./db/connection.mjs";
import { apiRouter } from "./routes/api.router.mjs";

const app: Express = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send("WELCOME TO CODEGATHER API. Start with this end point '/api'");
});

app.all("*", (req: Request, res: Response) => {
  res.status(400).send({ msg: "Bad Request" });
});

export default app;
