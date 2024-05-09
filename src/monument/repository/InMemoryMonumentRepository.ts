import { type Monuments } from "../Monument/types.js";
import type MonumentsRepository from "./types.js";

class InMemoryMonumentsRepository implements MonumentsRepository {
  constructor(public monuments: Monuments) {}

  getAll = async () => this.monuments;
}

export default InMemoryMonumentsRepository;
