import { type Request, type Response } from "express";
import type MonumentControllerStructure from "./types.js";
import monuments from "../../data/index.js";

class MonumentController implements MonumentControllerStructure {
  getMonuments = (_req: Request, res: Response): void => {
    res.status(200).json({ monuments });
  };
}

export default MonumentController;
