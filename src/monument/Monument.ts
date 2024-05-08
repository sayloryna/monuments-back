import { randomUUID } from "node:crypto";
import { type MonumentStructure, type MonumentLocation } from "./types";

class Monument implements MonumentStructure {
  public id: string;
  public description: string;
  public country: string;
  public city: string;

  constructor(
    public name: string,
    public imageUrl: string,
    location: MonumentLocation,
  ) {
    this.id = randomUUID();
    this.country = location.country;
    this.city = location.city;
  }
}
