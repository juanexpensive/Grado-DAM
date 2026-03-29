import { Persona } from '../../entities/Persona';

export interface IRepositoryPersonas {
  getListaPersonas(): Promise<Persona[]>;
  crearPersona(personaNueva: Persona): Promise<number>;
  actualizarPersona(idPersona: number, persona: Persona): Promise<number>;
  eliminarPersona(idPersona: number): Promise<number>;
  getPersonaById(idPersona: number): Promise<Persona | null>;
  contarPersonaDepartamento(idDepartamento: number): Promise<number>;
}