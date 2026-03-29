export class ResultadoJuego {
  aciertos: number;
  total: number;
  gano: boolean;

  constructor(aciertos: number, total: number, gano: boolean) {
    this.aciertos = aciertos;
    this.total = total;
    this.gano = gano;
  }
}