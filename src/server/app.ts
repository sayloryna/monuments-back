import express from "express";
import morgan from "morgan";
import { notFoundError, generalError } from "./middlewares/errorsMidlewares.js";
import pingController from "./controllers/pingController/pingController.js";
import { monumentsController } from "../monument/controller/index.js";

const app = express();

app.use(morgan("dev"));

app.get("/", pingController);

app.get("/monuments", monumentsController.getMonuments);

app.use(notFoundError);
app.use(generalError);

export default app;
