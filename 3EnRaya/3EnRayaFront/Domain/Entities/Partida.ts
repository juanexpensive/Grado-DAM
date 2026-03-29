export class Partida {
    constructor(
        public tablero: string[][] = Array(3).fill(null).map(() => Array(3).fill("")),
        public miNumero: number = 0,
        public esMiTurno: boolean = false,
        public esperandoOponente: boolean = true,
        public resultado: string = "" // "Vencedor", "Perdedor", "Tablas" o ""
    ) { }
}
