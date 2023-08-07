import { Request, Response } from "express";
import sampleIds from "../../dist/db/seed/sampleIds.js"

const getSampleIds = (req: Request, res: Response) => {
  res
    .status(200)
    .send({ success: true, msg: "List of sample ids", sample_ids: sampleIds });
};

export { getSampleIds };
