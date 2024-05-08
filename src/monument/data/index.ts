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

  new Monument(
    "Angkor Wat:",
    "Es el templo más grande y mejor conservado del complejo de templos de Angkor. Construido en el siglo XII, es un magnífico ejemplo de la arquitectura jemer y es considerado como el símbolo nacional de Camboya.",
    "url",
    { country: "Camboya", city: "Siem Reap" },
  ),
];