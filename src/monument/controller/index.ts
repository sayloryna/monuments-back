import monuments from "../data/index.js";
import InMemoryMonumentsRepository from "../repository/InMemoryMonumentRepository.js";
import MonumentsController from "./MonumentsController/MonumentsController.js";

const monumentsRepository = new InMemoryMonumentsRepository(monuments);

export const monumentsController = new MonumentsController(monumentsRepository);
