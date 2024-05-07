import { type Request, type Response } from "express";

const pingController = (_req: Request, res: Response): void => {
  res.status(200).json({ ping: "🏓 Pong" });
};

export default pingController;
