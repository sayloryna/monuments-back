import express from "express";
import { notFoundError, generalError } from "./middlewares/errorsMidlewares.js";
import pingController from "./controllers/pingController/pingController.js";

const app = express();

app.get("/", pingController);

app.use(notFoundError);

app.use(generalError);

export default app;
