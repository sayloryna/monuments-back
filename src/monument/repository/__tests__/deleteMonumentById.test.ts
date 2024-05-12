import ServerError from "../../../server/middlewares/errors/ServerError/ServerError";
import { type Monuments } from "../../Monument/types";
import InMemoryMonumentsRepository from "../InMemoryMonumentRepository";

describe("Given the InMemoryMonumentRepository deleteMonumentById method", () => {
  describe("When it receives the Id:'miau1234' ans its monument list contains a monuemnt with id: 'miau1234'", () => {
    const monument1 = {
      name: "Parthenon",
      description: "templo",
      imageUrl: "url",
      city: "Athenas",
      country: "grecia",
      id: "atheneaNike",
    };
    const monumentWithMatchingId = {
      name: "Miautenon",
      description: "Cat Templo",
      imageUrl: "url",
      city: "Miathenas",
      country: "greciau",
      id: "miau1234",
    };
    const monumentId = "miau1234";

    let monuments: Monuments = [];

    beforeEach(() => {
      monuments = [monument1, monumentWithMatchingId];
    });

    test("Then it should return the monument", async () => {
      const memoryRepository = new InMemoryMonumentsRepository(monuments);

      const deletedMonument =
        await memoryRepository.deleteMonumentById(monumentId);

      expect(deletedMonument).toEqual(monumentWithMatchingId);
    });

    test("Thenit should delete the monument taht matches that id from the monuments list", async () => {
      const memoryRepository = new InMemoryMonumentsRepository(monuments);

      const expectedMonumentsAfterDelete: Monuments = [monument1];

      await memoryRepository.deleteMonumentById(monumentId);

      expect(memoryRepository.monuments).toStrictEqual(
        expectedMonumentsAfterDelete,
      );
    });
  });

  describe("When it receives the Id:'miau1234' ans its monument list does NOT contain a monuemnt with id: 'miau1234'", () => {
    test("Then it should throw an error 'No Monument matched the Id:miau1234' and the statusCode 404", async () => {
      const monuments: Monuments = [
        {
          name: "Parthenon",
          description: "templo",
          imageUrl: "url",
          city: "Athenas",
          country: "grecia",
          id: "atheneaNike",
        },
        {
          name: "Guautenon",
          description: "dog Templo",
          imageUrl: "url",
          city: "Guauthenas",
          country: "greciau",
          id: "guay1234",
        },
      ];
      const monumentId = "miau1234";

      const memoryRepository = new InMemoryMonumentsRepository(monuments);

      const expectedError = new ServerError(
        `No Monument matched the Id:miau1234`,
        404,
      );

      try {
        await memoryRepository.deleteMonumentById(monumentId);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });
});
