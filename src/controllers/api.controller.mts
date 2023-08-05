import { Request, Response } from "express";
import endpoints from "../endpointsList.mjs";

const getApi = (req: Request, res: Response) => {
  res.status(200).send({ success: true, msg: "List of endpoints", endpoints });
};

export default getApi;
