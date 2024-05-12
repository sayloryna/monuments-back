import chalk from "chalk";
import { type NextFunction, type Request, type Response } from "express";
import ServerError from "./errors/ServerError/ServerError.js";

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const error = new ServerError("Endpoint not found", 404);

  next(error);
};

export const generalError = (
  error: ServerError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = error.statusCode ?? 500;

  console.log(chalk.red(`${error.message}`));

  res.status(statusCode).json({ error: `${error.message}` });
};
