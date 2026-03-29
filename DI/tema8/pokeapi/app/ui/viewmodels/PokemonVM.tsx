// src/ui/viewmodels/PokemonVM.ts
import { injectable } from "inversify";
import { IPokemonUC } from "../../domain/interfaces/usecases/IPokemonUC";
import { Pokemon } from "../../domain/entities/pokemon";

@injectable()
export class PokemonVM {
  private offset: number = 0;
  private limit: number = 20;

  constructor(private pokemonUC: IPokemonUC) {}

  async getListaPokemon(): Promise<Pokemon[]> {
    const results = await this.pokemonUC.getListaPokemon(this.offset, this.limit);
    this.offset += 20; // Lógica de incremento para la siguiente llamada
    return results;
  }
}