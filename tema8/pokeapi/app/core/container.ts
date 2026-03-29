import "reflect-metadata";
import { Container, Context } from "inversify"; // Importamos Context directamente
import { TYPES } from "./types";
import { PokemonRepository } from "../../data/repositories/PokemonRepository";
import { PokemonUC } from "../../domain/usecases/PokemonUC";
import { PokemonVM } from "../../ui/viewmodels/PokemonVM";
import { IPokemonRepository } from "../../domain/interfaces/repositories/IPokemonRepository";
import { IPokemonUC } from "../../domain/interfaces/usecases/IPokemonUC";

const container = new Container();

// 1. Registro del Repositorio
container.bind<IPokemonRepository>(TYPES.IPokemonRepository).to(PokemonRepository);

// 2. Registro del Use Case con inyección manual en el constructor
container.bind<IPokemonUC>(TYPES.IPokemonUC).toDynamicValue((context: Context) => {
  const repo = context.container.get<IPokemonRepository>(TYPES.IPokemonRepository);
  return new PokemonUC(repo);
});

// 3. Registro del ViewModel con inyección manual en el constructor
container.bind<PokemonVM>(TYPES.PokemonVM).toDynamicValue((context: Context) => {
  const useCase = context.container.get<IPokemonUC>(TYPES.IPokemonUC);
  return new PokemonVM(useCase);
});

export { container };