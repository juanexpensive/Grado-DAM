import { DatosJuegoDTO } from '../../dtos/DatosJuegoDTO';
import { ResultadoJuego } from '../../entities/ResultadoJuego';

export interface IUseCaseJuego {
  obtenerDatosJuego(): Promise<DatosJuegoDTO>;
  comprobarDepartamentos(asignaciones: { [key: number]: number }): Promise<ResultadoJuego>;
}
