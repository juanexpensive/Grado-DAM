import "reflect-metadata";
import { useState, useEffect } from "react";
import { Partida } from "../../Domain/Entities/Partida";
import { IUseCaseGame } from "../../Domain/Interfaces/IUseCaseGame";
import { IGameRepository } from "../../Domain/Interfaces/IGameRepository";
import { container } from "../../Core/DI/container";
import { TYPES } from "../../Core/DI/types";

export const useGameViewModel = () => {
    const [partida, setPartida] = useState<Partida>(new Partida());
    const useCase = container.get<IUseCaseGame>(TYPES.IUseCaseGame);
    const repository = container.get<IGameRepository>(TYPES.IGameRepository);

    useEffect(() => {
        repository.onEstadoActualizado((nuevaPartida) => {
            setPartida(nuevaPartida);
        });

        useCase.conectar();
    }, []);

    const mover = async (fila: number, columna: number) => {
        if (partida.esMiTurno && !partida.esperandoOponente && !partida.resultado) {
            await useCase.mover(fila, columna);
        }
    };

    const reiniciar = async () => {
        await useCase.reiniciar();
    };

    return {
        partida,
        mover,
        reiniciar
    };
};
