import ServerError from "../../../server/middlewares/errors/ServerError/ServerError";
import Monument from "../../Monument/Monument";
import InMemoryMonumentsRepository from "../InMemoryMonumentRepository";

describe("Given the inMemoryMonumentRepository addMonument method", () => {
  describe("When it receives 'Sagrada Familia','templo sin acabar', 'url' 'BCN' y 'España' and there is NOT a monument Sagrada familia in the list", () => {
    test("Then it should return the 'sagrada familia' monument", async () => {
      const monumentData: Omit<Monument, "id"> = {
        name: "Sagrada familia",
        description: "templo sin acabar",
        imageUrl: "url",
        city: "BCN",
        country: "España",
      };

      const monumentRepository = new InMemoryMonumentsRepository([]);

      const newMonument = await monumentRepository.addMonument(
        monumentData.name,
        monumentData.description,
        monumentData.imageUrl,
        { city: monumentData.city, country: monumentData.country },
      );

      expect(newMonument).toMatchObject(expect.objectContaining(monumentData));
    });
  });

  describe("When it receives 'Sagrada Familia','templo sin acabar', 'url' 'BCN' y 'España' and there IS a monument Sagrada familia in the list", () => {
    test("Then it should throw an error 'Monument named 'Sagrada Familia' already exists' and the statusCode 409", async () => {
      const monumentData: Omit<Monument, "id"> = {
        name: "Sagrada familia",
        description: "templo sin acabar",
        imageUrl: "url",
        city: "BCN",
        country: "España",
      };

      const monuments = [
        new Monument("sagrada familia", "casi-templo", "url", {
          city: "BCN",
          country: "supain",
        }),
      ];

      const monumentRepository = new InMemoryMonumentsRepository(monuments);

      const errorMessage = "Monument named 'Sagrada familia' already exists";
      const statusCode = 409;
      const expectedError = new ServerError(errorMessage, statusCode);

      try {
        await monumentRepository.addMonument(
          monumentData.name,
          monumentData.description,
          monumentData.imageUrl,
          { city: monumentData.city, country: monumentData.country },
        );
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });
});
