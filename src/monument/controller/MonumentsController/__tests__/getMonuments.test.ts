import { type Request, type Response } from "express";
import { type Monuments } from "../../../Monument/types";
import Monument from "../../../Monument/Monument";
import InMemoryMonumentsRepository from "../../../repository/InMemoryMonumentRepository";
import MonumentsController from "../MonumentsController";
import { type ResponseWithStatusAndJson } from "../types";

describe("Given the MonumentsController getMonument method", () => {
  describe("When it receives a response", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test("Then it should call its status with 200 and its json method with a list o monuments", async () => {
      const monuments: Monuments = [
        new Monument("Sagrada familia", "basilica sin acabar", "url", {
          city: "BCN",
          country: "España",
        }),
        new Monument("Torre Eiffel", "torre de hierro", "url", {
          city: "Paris",
          country: "Francia",
        }),
      ];

      const monumentsRepository = new InMemoryMonumentsRepository(monuments);
      const monumentsController = new MonumentsController(monumentsRepository);

      const req = {};
      const res: ResponseWithStatusAndJson = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await monumentsController.getMonuments(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ monuments });
    });
  });
});
