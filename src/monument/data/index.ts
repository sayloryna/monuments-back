import Monument from "../Monument/Monument";
import type Monuments from "./types";

const monuments: Monuments = [
  new Monument(
    "La Sagrada Familia",
    "Basílica diseñada por el arquitecto Antoni Gaudí de estilo modernista catalán.",
    "https://upload.wikimedia.org/wikipedia/commons/b/b9/Sagrada_Familia_1-4-24.jpg",
    { country: "España", city: "Barcelona" },
  ),
  new Monument(
    "Templo de Karnak",
    "Complejo religioso destacado por sus columnas imponentes, relieves elaborados y pilonos monumentales. Construido principalmente en piedra caliza y granito.",
    "https://upload.wikimedia.org/wikipedia/commons/f/f2/Karnak_Temples.jpg",
    {
      country: "Egipto",
      city: "Luxor",
    },
  ),
  new Monument(
    "Stonehenge",
    "Monumento prehistórico formado por círculos concéntricos de piedras verticales.",
    "https://upload.wikimedia.org/wikipedia/commons/3/3c/Stonehenge2007_07_30.jpg",
    { country: "Inglaterra", city: "Wiltshire" },
  ),
  new Monument(
    "Angkor Wat",
    "Es el templo más grande y mejor conservado del complejo de templos de Angkor. Construido en el siglo XII, es un magnífico ejemplo de la arquitectura jemer y es considerado como el símbolo nacional de Camboya.",
    "https://upload.wikimedia.org/wikipedia/commons/7/72/Angkor_wat_temple.jpg",
    { country: "Camboya", city: "Siem Reap" },
  ),
  new Monument(
    "Mezquita Sheikh Zayed",
    "Es una de las mezquitas más grandes y espectaculares del mundo. Su diseño impresionante incluye mármoles blancos, intrincados detalles de oro y el mayor tapiz tejido a mano del mundo.",
    "https://media.admagazine.com/photos/618a646aaf428eae6e0b59f7/master/w_1600,c_limit/70927.jpg",
    { country: "Emiratos Árabes Unidos", city: "Abu Dabi" },
  ),
];
