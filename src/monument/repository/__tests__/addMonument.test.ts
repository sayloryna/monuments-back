import ServerError from "../../../server/middlewares/errors/ServerError/ServerError";
import { type MonumentWithoutId } from "../../controller/MonumentsController/types";
import Monument from "../../Monument/Monument";
import { type Monuments } from "../../Monument/types";
import InMemoryMonumentsRepository from "../InMemoryMonumentRepository";

describe("Given the inMemoryMonumentRepository addMonument method", () => {
  const sagradaFamilia: MonumentWithoutId = {
    name: "Sagrada familia",
    description: "templo sin acabar",
    imageUrl: "url",
    city: "BCN",
    country: "España",
  };
  describe("When it receives 'Sagrada Familia','templo sin acabar', 'url' 'BCN' y 'España' and there is NOT a monument Sagrada familia in the list", () => {
    test("Then it should return the 'sagrada familia' monument", async () => {
      const emptyMonumentsList: Monuments = [];

      const monumentRepository = new InMemoryMonumentsRepository(
        emptyMonumentsList,
      );

      const newMonument = await monumentRepository.addMonument(
        sagradaFamilia.name,
        sagradaFamilia.description,
        sagradaFamilia.imageUrl,
        { city: sagradaFamilia.city, country: sagradaFamilia.country },
      );

      expect(newMonument).toMatchObject(
        expect.objectContaining(sagradaFamilia),
      );
    });
  });

  describe("When it receives 'Sagrada Familia','templo sin acabar', 'url' 'BCN' y 'España' and there IS a monument Sagrada familia in the list", () => {
    test("Then it should throw an error 'Monument named 'Sagrada Familia' already exists' and the statusCode 409", async () => {
      const monuments = [
        new Monument(
          sagradaFamilia.name,
          sagradaFamilia.description,
          sagradaFamilia.imageUrl,
          { city: sagradaFamilia.city, country: sagradaFamilia.city },
        ),
      ];

      const monumentRepository = new InMemoryMonumentsRepository(monuments);

      const errorMessage = "Monument named 'Sagrada familia' already exists";
      const statusCode = 409;
      const expectedError = new ServerError(errorMessage, statusCode);

      try {
        await monumentRepository.addMonument(
          sagradaFamilia.name,
          sagradaFamilia.description,
          sagradaFamilia.imageUrl,
          { city: sagradaFamilia.city, country: sagradaFamilia.country },
        );
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });
});
