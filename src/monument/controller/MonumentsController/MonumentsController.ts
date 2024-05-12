import { type NextFunction, type Request, type Response } from "express";
import type MonumentControllerStructure from "./types.js";
import type MonumentsRepository from "../../repository/types.js";
import {
  type RequestWithIdParameter,
  type RequestWithMonumentBodyWithoutId,
} from "./types.js";

class MonumentsController implements MonumentControllerStructure {
  constructor(private readonly monumentsRepository: MonumentsRepository) {}

  async getMonuments(_req: Request, res: Response): Promise<void> {
    res
      .status(200)
      .json({ monuments: await this.monumentsRepository.getAll() });
  }

  async addMonument(
    req: RequestWithMonumentBodyWithoutId,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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
    } catch (error) {
      next(error);
    }
  }

  async deleteMonument(
    req: RequestWithIdParameter,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { id } = req.params;

    try {
      const deletedMonument =
        await this.monumentsRepository.deleteMonumentById(id);

      res.status(200).json({ deletedMonument });
    } catch (error) {
      next(error);
    }
  }
}

export default MonumentsController;
