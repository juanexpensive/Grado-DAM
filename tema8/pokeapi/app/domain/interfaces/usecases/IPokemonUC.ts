import { Pokemon } from "../../entities/pokemon";
export interface IPokemonUC {
  getListaPokemon(offset: number, limit: number): Promise<Pokemon[]>;
}