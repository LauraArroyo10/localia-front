import type { Product } from "../types/product";

export const mockProducts: Product[] = [
  {
    id: 1,
    image: "/img/jabones.jpg",
    name: "Tour de Café",
    description: "Recorrido guiado por plantaciones con degustación.",
    price: 25,
  },
  {
    id: 2,
    image: "/img/jabones.jpg",
    name: "Canopy Adventure",
    description: "Experiencia de canopy entre los bosques tropicales.",
    price: 45,
  },
  {
    id: 3,
    image: "/img/jabones.jpg",
    name: "Paseo en Catamarán",
    description: "Tour al atardecer con vistas al océano.",
    price: 60,
  },
  {
    id: 4,
    image: "/img/jabones.jpg",
    name: "Kit de Souvenirs",
    description: "Recuerdo artesanal elaborado por productores locales.",
    price: 15,
  },
];