import { type Request, type Response } from "express";
import pingController from "./pingController.js";

describe("Given the pingController handler", () => {
  describe("When it receives a response", () => {
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("Then it should call its status method with 200", () => {
      const statusCode = 200;

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call its json method with a'🏓 Pong' message", () => {
      const expectedPing = "🏓 Pong";

      pingController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ message: expectedPing });
    });
  });
});
