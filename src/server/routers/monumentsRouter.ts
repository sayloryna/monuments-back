import express from "express";
import { monumentsController } from "../../monument/controller/index.js";

export const monumentsRouter = express.Router();

monumentsRouter.get("/", monumentsController.getMonuments);

monumentsRouter.post("/", monumentsController.addMonument);
