import "reflect-metadata";
import { injectable, inject } from "inversify";
import { IUseCaseGame } from "../Interfaces/IUseCaseGame";
import { IGameRepository } from "../Interfaces/IGameRepository";
import { TYPES } from "../../Core/DI/types";

@injectable()
export class DefaultUseCaseGame implements IUseCaseGame {
    constructor(
        @inject(TYPES.IGameRepository) private repository: IGameRepository
    ) { }

    async conectar(): Promise<void> {
        await this.repository.conectar();
    }

    async mover(fila: number, columna: number): Promise<void> {
        await this.repository.mover(fila, columna);
    }

    async reiniciar(): Promise<void> {
        await this.repository.reiniciar();
    }
}
