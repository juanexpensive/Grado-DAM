import "reflect-metadata";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { injectable } from "inversify";
import { IGameRepository } from "../../Domain/Interfaces/IGameRepository";
import { Partida } from "../../Domain/Entities/Partida";

@injectable()
export class GameRepository implements IGameRepository {
    private connection: HubConnection;
    private onEstadoCallback?: (partida: Partida) => void;
    private miNumero: number = 0;

    constructor() {
        this.connection = new HubConnectionBuilder()
            .withUrl("https://3enraya-dmgzhpdhazaphxg3.spaincentral-01.azurewebsites.net/tresEnRaya")
            .withAutomaticReconnect()
            .build();

        this.setupHandlers();
    }

    private setupHandlers() {
        this.connection.on("Mensaje", (msg: string) => {
            if (msg === "Esperando oponente...") {
                this.miNumero = 1;
                this.notifyUpdate(new Partida(this.createEmptyBoard(), 1, false, true, ""));
            }
        });

        this.connection.on("ComenzarJuego", () => {
            if (this.miNumero === 0) this.miNumero = 2;
            this.notifyUpdate(new Partida(this.createEmptyBoard(), this.miNumero, this.miNumero === 1, false, ""));
        });

        this.connection.on("ActualizarTablero", (partidaBack: any) => {
            const board = this.convertBoard(partidaBack.tablero);
            const esMiTurno = partidaBack.turnoActual === this.miNumero && !partidaBack.finalizada;

            let resultado = "";
            if (partidaBack.finalizada) {
                if (partidaBack.ganador === 3) resultado = "Tablas";
                else if (partidaBack.ganador === this.miNumero) resultado = "Vencedor";
                else resultado = "Perdedor";
            }

            this.notifyUpdate(new Partida(board, this.miNumero, esMiTurno, false, resultado));
        });

        this.connection.on("OponenteDesconectado", () => {
            this.notifyUpdate(new Partida(this.createEmptyBoard(), this.miNumero, false, true, "Oponente desconectado"));
        });
    }

    private createEmptyBoard(): string[][] {
        return [["", "", ""], ["", "", ""], ["", "", ""]];
    }

    private convertBoard(backendTablero: any): string[][] {
        // Manejar tanto arrays anidados como arrays planos (matrices C#)
        if (Array.isArray(backendTablero) && backendTablero.length === 9 && !Array.isArray(backendTablero[0])) {
            const board: string[][] = [];
            for (let i = 0; i < 3; i++) {
                board.push(backendTablero.slice(i * 3, (i + 1) * 3)); // Corrected slice end index
            }
            return board;
        }
        return backendTablero;
    }

    private notifyUpdate(partida: Partida) {
        this.onEstadoCallback?.(partida);
    }

    async conectar(): Promise<void> {
        try {
            if (this.connection.state === "Disconnected") {
                await this.connection.start();
            }
        } catch (err) {
            console.error("SignalR Connection Error:", err);
        }
    }

    async mover(fila: number, columna: number): Promise<void> {
        if (this.connection.state === "Connected") {
            await this.connection.invoke("Mover", fila, columna);
        }
    }

    async reiniciar(): Promise<void> {
        if (this.connection.state === "Connected") {
            await this.connection.invoke("Reiniciar");
        }
    }

    onEstadoActualizado(callback: (partida: Partida) => void): void {
        this.onEstadoCallback = callback;
    }
}
