import { type Monuments } from "../Monument/types";

interface MonumentsRepository {
  getAll(): Promise<Monuments>;
}
export default MonumentsRepository;
