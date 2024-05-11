import ServerError from "../../../server/middlewares/errors/ServerError/ServerError";
import { type Monuments } from "../../Monument/types";
import InMemoryMonumentsRepository from "../InMemoryMonumentRepository";

describe("Given the InMemoryMonumentRepository deleteMonumentById method", () => {
  describe("When it receives the Id:'miau1234' ans its monument list contains a monuemnt with id: 'miau1234'", () => {
    test("Then it should remove the monument with Id: 'miau1234' from its monuments list  and return the monument", async () => {
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
          name: "Miautenon",
          description: "Cat Templo",
          imageUrl: "url",
          city: "Miathenas",
          country: "greciau",
          id: "miau1234",
        },
      ];
      const expectedMonuemnts: Monuments = [
        {
          name: "Parthenon",
          description: "templo",
          imageUrl: "url",
          city: "Athenas",
          country: "grecia",
          id: "atheneaNike",
        },
      ];

      const expectedMonument = {
        name: "Miautenon",
        description: "Cat Templo",
        imageUrl: "url",
        city: "Miathenas",
        country: "greciau",
        id: "miau1234",
      };

      const memoryRepository = new InMemoryMonumentsRepository(monuments);

      const deletedMonument =
        await memoryRepository.deleteMonumentById("miau1234");

      expect(memoryRepository.monuments).toStrictEqual(expectedMonuemnts);
      expect(deletedMonument).toEqual(expectedMonument);
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
