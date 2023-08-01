import express, { Express, Request, Response } from "express";
import "./db/connection.mjs";
import { apiRouter } from "./routes/api.router.mjs";

const app: Express = express();

app.use(express.json());
app.use("/api", apiRouter)

app.get("/", (req: Request, res: Response)=> {
  res.status(200).send("Hello from the CodeGather server")
})

export default app