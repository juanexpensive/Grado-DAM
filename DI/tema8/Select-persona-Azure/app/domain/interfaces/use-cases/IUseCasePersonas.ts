import { Persona } from '../../entities/Persona';
import { PersonaConNombreDeDepartamentoDTO } from '../../dtos/PersonaConNombreDeDepartamentoDTO';

export interface IUseCasePersonas {
  getListaPersonasConDepartamento(): Promise<PersonaConNombreDeDepartamentoDTO[]>;
  getListaPersonas(): Promise<Persona[]>;
  getDetallePersona(id: number): Promise<PersonaConNombreDeDepartamentoDTO | null>;
  crearPersona(persona: Persona): Promise<number>;
  actualizarPersona(id: number, persona: Persona): Promise<number>;
  eliminarPersona(id: number): Promise<number>;
}