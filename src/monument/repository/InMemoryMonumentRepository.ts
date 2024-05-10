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
}

export default InMemoryMonumentsRepository;
