import { TYPES } from '@/app/core/types';
import { inject, injectable } from 'inversify';
import { PersonaConNombreDeDepartamentoDTO } from '../dtos/PersonaConNombreDeDepartamentoDTO';
import { Persona } from '../entities/Persona';
import { IRepositoryDepartamentos } from '../interfaces/repositories/IRepositoryDepartamentos';
import { IRepositoryPersonas } from '../interfaces/repositories/IRepositoryPersonas';
import { IUseCasePersonas } from '../interfaces/use-cases/IUseCasePersonas';

@injectable()
export class DefaultUseCasePersonas implements IUseCasePersonas {
  constructor(
    @inject(TYPES.IRepositoryPersonas) private repositoryPersonas: IRepositoryPersonas,
    @inject(TYPES.IRepositoryDepartamentos) private repositoryDepartamentos: IRepositoryDepartamentos
  ) {}

  /**
   * Obtiene la lista de personas incluyendo el nombre del departamento
   */
  async getListaPersonasConDepartamento(): Promise<PersonaConNombreDeDepartamentoDTO[]> {
    const personas = await this.repositoryPersonas.getListaPersonas();
    const departamentos = await this.repositoryDepartamentos.getListaDepartamentos();

    return personas.map(p => {
      const dept = departamentos.find(d => d.ID === p.IDDepartamento);
      return {
        ID: p.ID,
        Nombre: p.Nombre,
        Apellidos: p.Apellidos,
        FechaNacimiento: p.FechaNacimiento,
        Direccion: p.Direccion,
        Telefono: p.Telefono,
        Foto: p.Foto,
        NombreDepartamento: dept?.Nombre || 'Sin departamento'
      };
    });
  }

  /**
   * Obtiene la lista completa de personas
   */
  async getListaPersonas(): Promise<Persona[]> {
    return await this.repositoryPersonas.getListaPersonas();
  }
  

  /**
   * Obtiene el detalle de una persona por ID, incluyendo nombre de departamento
   */
  async getDetallePersona(id: number): Promise<PersonaConNombreDeDepartamentoDTO | null> {
    const persona = await this.repositoryPersonas.getPersonaById(id);
    if (!persona) return null;

    const departamento = await this.repositoryDepartamentos.getDepartamentoById(persona.IDDepartamento);

    return {
      ID: persona.ID,
      Nombre: persona.Nombre,
      Apellidos: persona.Apellidos,
      FechaNacimiento: persona.FechaNacimiento,
      Direccion: persona.Direccion,
      Telefono: persona.Telefono,
      Foto: persona.Foto,
      NombreDepartamento: departamento?.Nombre || 'Sin departamento'
    };
  }

  async crearPersona(persona: Persona): Promise<number> {
    return await this.repositoryPersonas.crearPersona(persona);
  }

  async actualizarPersona(id: number, persona: Persona): Promise<number> {
    return await this.repositoryPersonas.actualizarPersona(id, persona);
  }

  async eliminarPersona(id: number): Promise<number> {
    return await this.repositoryPersonas.eliminarPersona(id);
  }
}
