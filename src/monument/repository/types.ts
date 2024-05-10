import type Monument from "../Monument/Monument.js";
import { type MonumentLocation, type Monuments } from "../Monument/types";

interface MonumentsRepository {
  getAll(): Promise<Monuments>;
  addMonument(
    name: string,
    description: string,
    imageUrl: string,
    location: MonumentLocation,
  ): Promise<Monument>;
}
export default MonumentsRepository;
