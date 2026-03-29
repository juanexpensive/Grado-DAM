// src/data/repositories/PokemonRepository.ts
import { injectable } from "inversify";
import { IPokemonRepository } from "../../domain/interfaces/repositories/IPokemonRepository";
import { Pokemon } from "../../domain/entities/pokemon";

@injectable()
export class PokemonRepository implements IPokemonRepository {
  async getListaPokemon(offset: number, limit: number): Promise<Pokemon[]> {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();
    return data.results;
  }
}