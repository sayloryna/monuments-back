import Monument from "../Monument/Monument.js";
import { type MonumentLocation, type Monuments } from "../Monument/types.js";
import type MonumentsRepository from "./types.js";

class InMemoryMonumentsRepository implements MonumentsRepository {
  constructor(public monuments: Monuments) {}

  getAll = async () => this.monuments;

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
    if (this.monuments.find((monument) => monument.name === name)) {
      throw new Error("Monument already exists");
    }

    this.monuments.push(newMonument);

    return newMonument;
  };

  deleteMonumentById = async (monumentId: string) => {
    const monumentToDeleteIndex = this.monuments.findIndex(
      (monument) => monument.id === monumentId,
    );

    if (monumentToDeleteIndex === -1) {
      throw new Error("No monument matches that Id");
    }

    const [deletedMonument] = this.monuments.splice(monumentToDeleteIndex, 1);

    return deletedMonument;
  };
}

export default InMemoryMonumentsRepository;
