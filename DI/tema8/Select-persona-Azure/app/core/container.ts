import { Container } from "inversify";
import { TYPES } from "./types";

// Repositories
import { DepartamentosRepositoryAPI } from "../data/repositories/DepartamentoRepositoryAPI";
import { PersonasRepositoryAPI } from "../data/repositories/PersonaRepositoryAPI";
import { IRepositoryDepartamentos } from "../domain/interfaces/repositories/IRepositoryDepartamentos";
import { IRepositoryPersonas } from "../domain/interfaces/repositories/IRepositoryPersonas";

// Use Cases
import { IUseCaseDepartamentos } from "../domain/interfaces/use-cases/IUseCaseDepartamentos";
import { IUseCaseJuego } from "../domain/interfaces/use-cases/IUseCaseJuego";
import { IUseCasePersonas } from "../domain/interfaces/use-cases/IUseCasePersonas";
import { DefaultUseCaseDepartamentos } from "../domain/useCases/DefaultUseCaseDepartamento";
import { DefaultUseCaseJuego } from "../domain/useCases/DefaultUseCaseJuego";
import { DefaultUseCasePersonas } from "../domain/useCases/DefaultUseCasePersonas";

const container = new Container();

// Bind Repositories
container
  .bind<IRepositoryPersonas>(TYPES.IRepositoryPersonas)
  .to(PersonasRepositoryAPI);
container
  .bind<IRepositoryDepartamentos>(TYPES.IRepositoryDepartamentos)
  .to(DepartamentosRepositoryAPI);

// Bind Use Cases
container
  .bind<IUseCasePersonas>(TYPES.IUseCasePersonas)
  .to(DefaultUseCasePersonas);
container
  .bind<IUseCaseDepartamentos>(TYPES.IUseCaseDepartamentos)
  .to(DefaultUseCaseDepartamentos);
container.bind<IUseCaseJuego>(TYPES.IUseCaseJuego).to(DefaultUseCaseJuego);

export { container };

