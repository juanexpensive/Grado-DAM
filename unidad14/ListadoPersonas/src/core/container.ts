import { TYPES } from './types';
import { Container } from 'inversify';

// Repositories
import { IRepositoryPersonas } from '../domain/interfaces/repositories/IRepositoryPersonas';

import { PersonasRepositoryAPI } from '../data/repositories/PersonaRepositoryAPI';

// Use Cases
import { IUseCasePersonas } from '../domain/interfaces/use-cases/IUseCasePersonas';
//import { IUseCaseDepartamentos } from '../domain/interfaces/use-cases/IUseCaseDepartamento';
import { DefaultUseCasePersonas } from '../domain/useCases/DefaultUseCasePersonas';
//import { DefaultUseCaseDepartamentos } from '../domain/useCases/DefaultUseCaseDepartamento';

const container = new Container();

// Bind Repositories
container.bind<IRepositoryPersonas>(TYPES.IRepositoryPersonas).to(PersonasRepositoryAPI);

// Bind Use Cases
container.bind<IUseCasePersonas>(TYPES.IUseCasePersonas).to(DefaultUseCasePersonas);
//container.bind<IUseCaseDepartamentos>(TYPES.IUseCaseDepartamentos).to(DefaultUseCaseDepartamentos);

export { container };