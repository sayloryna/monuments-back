import { type NextFunction, type Request, type Response } from "express";
import { generalError } from "../errorsMidlewares";
import ServerError from "../errors/ServerError/ServerError";

describe("Given the generalError function", () => {
  const req = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("When it receives a response and 'Endpoint not found' error ith the statusCode 404", () => {
    test("Then it should call the response's method status with 404", () => {
      const error = new ServerError("Endpoint not found", 404);

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(error.statusCode);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe("When it receives a Response with an 'Unknown Error' error without statusCode", () => {
    test("Then it should call the Response  status method with 500; and its json method with error:Unknown Error", () => {
      const error = new Error("Unknown Error");
      const expectedStatusCode = 500;

      generalError(error as ServerError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
});
