import { type NextFunction, type Response, type Request } from "express";
import type Monument from "../../Monument/Monument";

interface MonumentControllerStructure {
  getMonuments(req: Request, res: Response, next: NextFunction): void;

  addMonument(req: Request, res: Response, next: NextFunction): void;
}

export type RequestWithMonumentBodyWithoutId = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  Omit<Monument, "id">
>;

export type PartialRequestWithMonumentWithoutId = Partial<
  Request<
    Record<string, unknown>,
    Record<string, unknown>,
    Omit<Monument, "id">
  >
>;

export default MonumentControllerStructure;
