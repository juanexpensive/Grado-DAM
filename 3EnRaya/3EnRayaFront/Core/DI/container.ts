import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { IGameRepository } from "../../Domain/Interfaces/IGameRepository";
import { GameRepository } from "../../Data/Repositories/GameRepository";
import { IUseCaseGame } from "../../Domain/Interfaces/IUseCaseGame";
import { DefaultUseCaseGame } from "../../Domain/UseCases/DefaultUseCaseGame";

const container = new Container();

container.bind<IGameRepository>(TYPES.IGameRepository).to(GameRepository).inSingletonScope();
container.bind<IUseCaseGame>(TYPES.IUseCaseGame).to(DefaultUseCaseGame);

export { container };
