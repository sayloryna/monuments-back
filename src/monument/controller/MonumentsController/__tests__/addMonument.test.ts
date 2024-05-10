import { type NextFunction, type Response } from "express";
import Monument from "../../../Monument/Monument";
import MonumentsController from "../MonumentsController";
import type InMemoryMonumentsRepository from "../../../repository/InMemoryMonumentRepository";
import {
  type PartialRequestWithMonumentWithoutId,
  type RequestWithMonumentBodyWithoutId,
} from "../types";
import { monumentsController } from "../..";

describe("Given the  monumentsConroller addMonument method", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const req: PartialRequestWithMonumentWithoutId = {
    body: {
      name: "Sagrada familia",
      description: "templo sin acabar",
      city: "BCN",
      country: "España",
      imageUrl: "url",
    },
  };
  const next: NextFunction = jest.fn().mockReturnThis();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const monumentData: Omit<Monument, "id"> = {
    name: "Sagrada familia",
    description: "templo sin acabar",
    imageUrl: "url",
    city: "BCN",
    country: "España",
  };
  describe("When it receives a request with 'Sagrada Familia','templo sin acabar', 'url' 'BCN' y 'España'", () => {
    test("Then it should call the response method with  the 'Sagrada familia' monument", async () => {
      const sagradaFamilia = new Monument(
        monumentData.name,
        monumentData.description,
        monumentData.imageUrl,
        { city: monumentData.city, country: monumentData.country },
      );

      const monumentsRepository: InMemoryMonumentsRepository = {
        monuments: [],
        getAll: jest.fn(),
        addMonument: jest.fn().mockReturnValue(sagradaFamilia),
        deleteMonumentById: jest.fn(),
      };
      const monumentsController = new MonumentsController(monumentsRepository);

      await monumentsController.addMonument(
        req as RequestWithMonumentBodyWithoutId,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({
        createdMonument: sagradaFamilia,
      });
    });

    test("Then it should call the response status method with 201", async () => {
      const expectedStatusCode = 201;

      await monumentsController.addMonument(
        req as RequestWithMonumentBodyWithoutId,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
