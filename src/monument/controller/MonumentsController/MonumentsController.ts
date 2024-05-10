import { type NextFunction, type Request, type Response } from "express";

import type MonumentControllerStructure from "./types.js";
import type MonumentsRepository from "../../repository/types.js";
import { type RequestWithMonumentBodyWithoutId } from "./types.js";
import ServerError from "../../../server/middlewares/errors/ServerError/ServerError.js";

class MonumentsController implements MonumentControllerStructure {
  constructor(private readonly monumentsRepository: MonumentsRepository) {}

  getMonuments = async (_req: Request, res: Response): Promise<void> => {
    res
      .status(200)
      .json({ monuments: await this.monumentsRepository.getAll() });
  };

  addMonument = async (
    req: RequestWithMonumentBodyWithoutId,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { city, description, imageUrl, country, name } = req.body;

    try {
      const newMonument = await this.monumentsRepository.addMonument(
        name,
        description,
        imageUrl,
        {
          country,
          city,
        },
      );

      res.status(201).json({ createdMonument: newMonument });
    } catch {
      const error = new ServerError(
        `Monument named ${name} already exists`,
        409,
      );
      next(error);
    }
  };
}

export default MonumentsController;
