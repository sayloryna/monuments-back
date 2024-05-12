import ServerError from "../../server/middlewares/errors/ServerError/ServerError.js";
import Monument from "../Monument/Monument.js";
import { type MonumentLocation, type Monuments } from "../Monument/types.js";
import type MonumentsRepository from "./types.js";

class InMemoryMonumentsRepository implements MonumentsRepository {
  constructor(public monuments: Monuments) {}

  getAll = async (): Promise<Monuments> => this.monuments;

  addMonument = async (
    name: string,
    description: string,
    imageUrl: string,
    { country, city }: MonumentLocation,
  ): Promise<Monument> => {
    const newMonument = new Monument(name, description, imageUrl, {
      country,
      city,
    });
    if (
      this.monuments.find(
        (monument) => monument.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      throw new ServerError(`Monument named '${name}' already exists`, 409);
    }

    this.monuments.push(newMonument);

    return newMonument;
  };

  deleteMonumentById = async (monumentId: string): Promise<Monument> => {
    const monumentToDeleteIndex = this.monuments.findIndex(
      (monument) => monument.id === monumentId,
    );

    if (monumentToDeleteIndex === -1) {
      throw new ServerError(`No Monument matched the Id:${monumentId}`, 404);
    }

    const [deletedMonument] = this.monuments.splice(monumentToDeleteIndex, 1);

    return deletedMonument;
  };
}

export default InMemoryMonumentsRepository;
