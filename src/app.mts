import express, { Express, Request, Response } from "express";
import "./db/connection.mjs";
import { apiRouter } from "./routes/api.router.mjs";

const app: Express = express();

app.use(express.json());
app.use("/api", apiRouter)

export default app