import { type Response, type Request, type NextFunction } from "express";
import MonumentsController from "../MonumentsController";
import InMemoryMonumentsRepository from "../../../repository/InMemoryMonumentRepository";
import { type Monuments } from "../../../Monument/types";
import type Monument from "../../../Monument/Monument";
import ServerError from "../../../../server/middlewares/errors/ServerError/ServerError";

describe("Given the MonumentsController deleteMonument method", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const req: Partial<Request> = { params: { id: "1234Miau" } };
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("When it receives a request with the ID '1234Miau' and a response and there is a monument with that id in the list ", () => {
    test("Then it should call the response status method with 200", async () => {
      const monuments: Monuments = [
        {
          name: "Miau templo",
          description: "",
          imageUrl: "url",
          id: "1234Miau",
          city: "las vegas",
          country: "USA",
        },
        {
          name: "guuay templo",
          description: "",
          imageUrl: "url",
          id: "guau5678",
          city: "las vegas",
          country: "USA",
        },
      ];

      const expectedStatusCode = 200;

      const monumentRepository = new InMemoryMonumentsRepository(monuments);
      const monumentsController = new MonumentsController(monumentRepository);

      await monumentsController.deleteMonument(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
    test("Then it should call the response json method with the monument matching the id: '1234Miau'", async () => {
      const monuments: Monuments = [
        {
          name: "Miau torre",
          description: "",
          imageUrl: "url",
          id: "1234Miau",
          city: "ponferrada",
          country: "españa",
        },
        {
          name: "guuay monasterio",
          description: "",
          imageUrl: "url",
          id: "guau5678",
          city: "san agustin",
          country: "USA",
        },
      ];

      const monumentRepository = new InMemoryMonumentsRepository(monuments);
      const monumentsController = new MonumentsController(monumentRepository);

      await monumentsController.deleteMonument(
        req as Request,
        res as Response,
        next,
      );

      const deletedMonument: Monument = {
        name: "Miau torre",
        description: "",
        imageUrl: "url",
        id: "1234Miau",
        city: "ponferrada",
        country: "españa",
      };

      expect(res.json).toHaveBeenCalledWith({ deletedMonument });
    });
  });

  describe("When it receives a request with the ID '1234Miau' and a response and there is NOT a monument with that id in the list ", () => {
    test("Then call the next function with an error", async () => {
      const monuments: Monuments = [
        {
          name: "dolmen de Menga",
          description: "",
          imageUrl: "url",
          id: "dolmen1",
          city: "antequeta",
          country: "españa",
        },
        {
          name: "guuay templo",
          description: "",
          imageUrl: "url",
          id: "guau5678",
          city: "las vegas",
          country: "USA",
        },
      ];

      const monumentRepository = new InMemoryMonumentsRepository(monuments);
      const monumentsController = new MonumentsController(monumentRepository);

      const expectedError = new ServerError(
        `No Monument matched the Id:1234Miau`,
        404,
      );

      await monumentsController.deleteMonument(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
