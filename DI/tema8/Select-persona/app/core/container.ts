import { Container } from "inversify";
import { TYPES } from "./types";
import "reflect-metadata";
import { IRepositoryPersonas} from "../domain/interfaces/repositories/IRepositoryPersonas";
import {PersonasRepository} from "../data/repositories/PersonaRepository";
import { PeopleListVM } from "../presentation/viewmodels/PeopleListVM";


const container = new Container();


// Vinculamos la interfaz con su implementación concreta
container.bind<IRepositoryPersonas>(TYPES.IRepositoryPersonas).to(PersonasRepository);
container.bind<PeopleListVM>(TYPES.IndexVM).to(PeopleListVM);
export { container };




