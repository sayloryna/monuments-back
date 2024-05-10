import Monument from "../../Monument/Monument";
import InMemoryMonumentsRepository from "../InMemoryMonumentRepository";

describe("Given the inMemoryMonumentsRepository  getAll method", () => {
  describe("When it's called", () => {
    test("Then it should return  the repository monuments list", async () => {
      const repositoryMonuments = [
        new Monument("sagrada familia", "obra larga", "url", {
          city: "BCN",
          country: "España",
        }),
        new Monument("torre eiffel", "torre de hierro", "url", {
          city: "paris",
          country: "francia",
        }),
      ];
      const inMemoryMonumentsRepository = new InMemoryMonumentsRepository(
        repositoryMonuments,
      );

      const monuments = await inMemoryMonumentsRepository.getAll();

      expect(monuments).toBe(repositoryMonuments);
    });
  });
});
