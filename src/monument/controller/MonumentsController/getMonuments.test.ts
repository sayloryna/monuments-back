import { type Request, type Response } from "express";
import Monument from "../../Monument/Monument";
import InMemoryMonumentsRepository from "../../repository/InMemoryMonumentRepository";
import MonumentsController from "./MonumentsController";
import { type Monuments } from "../../Monument/types";

describe("Given the MonumentsController getMonument method", () => {
  describe("When it receives a response", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test("Then it should call its status with 200 and its json method with a list o monuments", async () => {
      const monuments: Monuments = [
        new Monument("a", "a", "a", { city: "a", country: "a" }),
        new Monument("b", "b", "b", { city: "b", country: "b" }),
      ];

      const monumentsRepository = new InMemoryMonumentsRepository(monuments);
      const monumentsController = new MonumentsController(monumentsRepository);

      const req = {};
      const res: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await monumentsController.getMonuments(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ monuments });
    });
  });
});
