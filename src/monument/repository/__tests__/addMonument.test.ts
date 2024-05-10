import type Monument from "../../Monument/Monument";
import InMemoryMonumentsRepository from "../InMemoryMonumentRepository";

describe("Given the inMemoryMonumentRepository addMonument method", () => {
  describe("When it receives 'Sagrada Familia','templo sin acabar', 'url' 'BCN' y 'España'", () => {
    test("Then it should return the  'sagrada familia' monument", async () => {
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
});
