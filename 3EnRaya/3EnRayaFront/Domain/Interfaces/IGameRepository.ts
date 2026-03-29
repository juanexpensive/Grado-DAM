import { Partida } from "../Entities/Partida";

export interface IGameRepository {
    conectar(): Promise<void>;
    mover(fila: number, columna: number): Promise<void>;
    reiniciar(): Promise<void>;
    onEstadoActualizado(callback: (partida: Partida) => void): void;
}
