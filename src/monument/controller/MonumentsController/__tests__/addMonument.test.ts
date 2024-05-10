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
  describe("When it receives a request with 'Sagrada Familia','templo sin acabar', 'url' 'BCN' y 'España'", () => {
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
    const next = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("Then it should call the response method with  the 'Sagrada familia' monument", async () => {
      const monumentData: Omit<Monument, "id"> = {
        name: "Sagrada familia",
        description: "templo sin acabar",
        imageUrl: "url",
        city: "BCN",
        country: "España",
      };
      const sagradaFamilia = new Monument(
        monumentData.name,
        monumentData.description,
        monumentData.imageUrl,
        { city: monumentData.city, country: monumentData.country },
      );

      const req: PartialRequestWithMonumentWithoutId = {
        body: {
          name: "Sagrada familia",
          description: "templo sin acabar",
          city: "BCN",
          country: "España",
          imageUrl: "url",
        },
      };

      const monumentsRepository: InMemoryMonumentsRepository = {
        monuments: [],
        getAll: jest.fn(),
        addMonument: jest.fn().mockReturnValue(sagradaFamilia),
      };
      const monumentsController = new MonumentsController(monumentsRepository);

      await monumentsController.addMonument(
        req as RequestWithMonumentBodyWithoutId,
        res as Response,
        next as NextFunction,
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
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
