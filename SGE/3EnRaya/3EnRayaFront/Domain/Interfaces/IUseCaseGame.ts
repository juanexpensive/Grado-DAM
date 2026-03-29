export interface IUseCaseGame {
    conectar(): Promise<void>;
    mover(fila: number, columna: number): Promise<void>;
    reiniciar(): Promise<void>;
}
