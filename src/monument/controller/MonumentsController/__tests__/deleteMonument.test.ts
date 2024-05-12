import { type Response, type NextFunction } from "express";
import MonumentsController from "../MonumentsController";
import InMemoryMonumentsRepository from "../../../repository/InMemoryMonumentRepository";
import { type Monuments } from "../../../Monument/types";
import ServerError from "../../../../server/middlewares/errors/ServerError/ServerError";
import {
  type ResponseWithStatusAndJson,
  type RequestWithIdParameter,
} from "../types";

describe("Given the MonumentsController deleteMonument method", () => {
  const res: ResponseWithStatusAndJson = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const req: Partial<RequestWithIdParameter> = { params: { id: "1234Miau" } };
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  const catTemple = {
    name: "Miau templo",
    description: "",
    imageUrl: "url",
    id: "1234Miau",
    city: "las vegas",
    country: "USA",
  };
  const dogTemple = {
    name: "guuay templo",
    description: "",
    imageUrl: "url",
    id: "guau5678",
    city: "las vegas",
    country: "USA",
  };
  describe("When it receives a request with the ID '1234Miau' and a response and there is a monument with that id in the list ", () => {
    let monuments: Monuments = [];
    let monumentRepository = new InMemoryMonumentsRepository(monuments);
    let monumentsController = new MonumentsController(monumentRepository);

    beforeEach(() => {
      monuments = [catTemple, dogTemple];
      monumentRepository = new InMemoryMonumentsRepository(monuments);
      monumentsController = new MonumentsController(monumentRepository);
    });
    test("Then it should call the response status method with 200", async () => {
      const expectedStatusCode = 200;

      await monumentsController.deleteMonument(
        req as RequestWithIdParameter,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
    test("Then it should call the response json method with the monument matching the id: '1234Miau'", async () => {
      await monumentsController.deleteMonument(
        req as RequestWithIdParameter,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ deletedMonument: catTemple });
    });
  });

  describe("When it receives a request with the ID '1234Miau' and a response and there is NOT a monument with that id in the list ", () => {
    test("Then call the next function with an error", async () => {
      const monuments: Monuments = [dogTemple];

      const monumentRepository = new InMemoryMonumentsRepository(monuments);
      const monumentsController = new MonumentsController(monumentRepository);

      const expectedError = new ServerError(
        `No Monument matched the Id:1234Miau`,
        404,
      );

      await monumentsController.deleteMonument(
        req as RequestWithIdParameter,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
