import Monument from "../Monument";
import type Monuments from "./types";

const monuments: Monuments = [
  new Monument(
    "La Sagrada Familia",
    "Basílica diseñada por el arquitecto Antoni Gaudí de estilo modernista catalán.",
    "url",
    { country: "España", city: "Barcelona" },
  ),

  new Monument(
    "Templo de Karnak",
    "Complejo religioso destacado por sus columnas imponentes, relieves elaborados y pilonos monumentales. Construido principalmente en piedra caliza y granito.",
    "url",
    {
      country: "Egipto",
      city: "Luxor",
    },
  ),

  new Monument(
    "Stonehenge",
    "Monumento prehistórico formado por círculos concéntricos de piedras verticales.",
    "url",
    { country: "Inglaterra", city: "Wiltshire" },
  ),
];
