import { PersonaJuegoDTO } from './PersonaJuegoDTO';
import { DepartamentoJuegoDTO } from './DepartamentoJuegoDTO';

export interface DatosJuegoDTO {
  Personas: PersonaJuegoDTO[];
  Departamentos: DepartamentoJuegoDTO[];
}