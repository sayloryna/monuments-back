import type Monument from "./Monument";

export interface MonumentStructure {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  country: string;
  city: string;
}

export type MonumentLocation = Pick<MonumentStructure, "country" | "city">;

export type Monuments = Monument[];
