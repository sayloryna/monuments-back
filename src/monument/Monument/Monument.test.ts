import Monument from "./Monument";

describe("Given the class Monument constructor", () => {
  describe("When it's called with 'El Escorial', 'Palacio grande y viejo', 'urldelafoto', and the location 'España','Madrid' ", () => {
    test("Then it should create and object with an ID  and name 'El Escorial', desciption 'Palacio grande y viejo', 'urldelafoto'  and country'España' city:''Madrid", () => {
      const expectedMonument: Omit<Monument, "id"> = {
        city: "Madrid",
        country: "España",
        description: "Palacio grande y viejo",
        name: "El Escorial",
        imageUrl: "urldelafoto",
      };

      const monument = new Monument(
        expectedMonument.name,
        expectedMonument.description,
        expectedMonument.imageUrl,
        { country: expectedMonument.country, city: expectedMonument.city },
      );
      expect(monument).toHaveProperty("id");
      expect(monument).toEqual(expect.objectContaining(expectedMonument));
    });
  });
});
