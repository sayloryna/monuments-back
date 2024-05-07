import express from "express";
import { notFoundError, errorMiddleware } from "./middleware/errorMidleware.js";
import pingController from "./pingController/pingController.js";

const app = express();

app.get("/", pingController);

app.use(notFoundError);

app.use(errorMiddleware);

export default app;
