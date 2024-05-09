import { type NextFunction, type Response, type Request } from "express";

interface MonumentControllerStructure {
  getMonuments(req: Request, res: Response, next: NextFunction): void;
}

export default MonumentControllerStructure;
