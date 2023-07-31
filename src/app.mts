import express, { Express, Request, Response } from "express";
import "./db/connection.mjs";
import { apiRouter } from "./routes/api.router.mjs";

const app: Express = express();
const PORT = process.env.PORT

app.use(express.json());
app.use("/api", apiRouter)

app.listen(PORT, ()=> {
  console.log(`Server listengin on port ${PORT}`)
});
