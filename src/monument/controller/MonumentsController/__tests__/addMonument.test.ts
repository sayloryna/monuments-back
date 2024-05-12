import { type NextFunction, type Response } from "express";
import Monument from "../../../Monument/Monument";
import MonumentsController from "../MonumentsController";
import InMemoryMonumentsRepository from "../../../repository/InMemoryMonumentRepository";
import {
  type ResponseWithStatusAndJson,
  type PartialRequestWithMonumentWithoutId,
  type RequestWithMonumentBodyWithoutId,
  type MonumentWithoutId,
} from "../types";
import { monumentsController } from "../..";
import ServerError from "../../../../server/middlewares/errors/ServerError/ServerError";

describe("Given the  monumentsConroller addMonument method", () => {
  const res: ResponseWithStatusAndJson = {
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

  const monumentData: MonumentWithoutId = {
    name: "Sagrada Familia",
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

  describe("When it receives a request with 'Sagrada Familia','templo sin acabar', 'url' 'BCN' y 'España'", () => {
    test("Then it should call the response method with  the 'Sagrada familia' monument", async () => {
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
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a request with 'Templo Miau','templo de gattos', 'url' 'Aviles' y 'España' and there's a Templo miau in the list", () => {
    test("Then it should call the next function with the error'Monument named 'Templo Miau' already exists' with the statusCode 409 ", async () => {
      const req: PartialRequestWithMonumentWithoutId = {
        body: {
          name: "Templo Miau",
          description: "templo de gatos",
          city: "BCN",
          country: "España",
          imageUrl: "url",
        },
      };
      const monuments = [
        new Monument("Templo miau", "templo de gatos", "url", {
          city: "aviles",
          country: "españa",
        }),
      ];

      const monumentsRepository = new InMemoryMonumentsRepository(monuments);

      const monumentsController = new MonumentsController(monumentsRepository);

      const errorMessage = "Monument named 'Templo Miau' already exists";
      const statusCode = 409;
      const expectedError = new ServerError(errorMessage, statusCode);

      await monumentsController.addMonument(
        req as RequestWithMonumentBodyWithoutId,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
