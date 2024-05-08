import Monument from "./Monument";

describe("Given the class Monument", () => {
  describe("When it's implemented with a 'El Escorial', 'Palacio grande y viejo', 'urldelafoto', and the location 'España','Madrid' ", () => {
    test("Then it should create and object with an ID  and name 'El Escorial', desciption'Palacio grande y viejo', 'urldelafoto'  and country'España' city:''Madrid", () => {
      const monument = new Monument(
        "El Escorial",
        "Palacio grande y viejo",
        "urldelafoto",
        { country: "España", city: "Madrid" },
      );

      const expectedMonument: Monument = {
        city: "Madrid",
        country: "España",
        description: "Palacio grande y viejo",
        id: "38f0e30b-e555-41e8-a14b-978730821b3d",
        name: "El Escorial",
        imageUrl: "urldelafoto",
      };
      expect(expectedMonument.id).toHaveLength(monument.id.length);
      expect(monument).toHaveProperty("id");
    });
  });
});
