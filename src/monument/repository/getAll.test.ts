import Monument from "../Monument/Monument.js";
import InMemoryMonumentsRepository from "./InMemoryMonumentRepository.js";

describe("Given the inMemoryMonumentsRepository  getAll method", () => {
  describe("When it's called", () => {
    test("Then it should return  the repository monuments list", async () => {
      const repositoryMonuments = [
        new Monument("a", "a", "a", { city: "a", country: "a" }),
        new Monument("b", "b", "b", { city: "b", country: "b" }),
      ];
      const inMemoryMonumentsRepository = new InMemoryMonumentsRepository(
        repositoryMonuments,
      );

      const monuments = await inMemoryMonumentsRepository.getAll();

      expect(monuments).toBe(repositoryMonuments);
    });
  });
});
