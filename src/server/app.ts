import express from "express";
import morgan from "morgan";
import { notFoundError, generalError } from "./middlewares/errorsMidlewares.js";
import pingController from "./controllers/pingController/pingController.js";

const app = express();

app.use(morgan("dev"));

app.get("/", pingController);

app.use(notFoundError);

app.use(generalError);

export default app;
