// src/domain/usecases/PokemonUC.ts
import { injectable } from "inversify";
import { IPokemonUC } from "../interfaces/usecases/IPokemonUC";
import { IPokemonRepository } from "../interfaces/repositories/IPokemonRepository";
import { Pokemon } from "../entities/pokemon";

@injectable()
export class PokemonUC implements IPokemonUC {
  // Recibe el repositorio por constructor sin @inject
  constructor(private repository: IPokemonRepository) {}

  async getListaPokemon(offset: number, limit: number): Promise<Pokemon[]> {
    return await this.repository.getListaPokemon(offset, limit);
  }
}