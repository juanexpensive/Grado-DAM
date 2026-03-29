import { Pokemon } from "../../entities/pokemon";
export interface IPokemonRepository {
  getListaPokemon(offset: number, limit: number): Promise<Pokemon[]>;
}