import { type Request, type Response } from "express";
import type MonumentControllerStructure from "./types.js";

import type MonumentsRepository from "../../repository/types.js";

class MonumentsController implements MonumentControllerStructure {
  constructor(private readonly monumentsRepository: MonumentsRepository) {}

  getMonuments = async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({ monumens: await this.monumentsRepository.getAll() });
  };
}

export default MonumentsController;
