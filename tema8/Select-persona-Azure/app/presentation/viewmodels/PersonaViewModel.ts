import { IUseCasePersonas } from '../../domain/interfaces/use-cases/IUseCasePersonas';
import { PersonaConNombreDeDepartamentoDTO } from '../../domain/dtos/PersonaConNombreDeDepartamentoDTO';
import { Persona } from '../../domain/entities/Persona';

export class PersonasViewModel {
  private useCase: IUseCasePersonas;

  constructor(useCase: IUseCasePersonas) {
    this.useCase = useCase;
  }

  async cargarPersonas(): Promise<PersonaConNombreDeDepartamentoDTO[]> {
    return await this.useCase.getListaPersonasConDepartamento();
  }

  async cargarDetallePersona(id: number): Promise<PersonaConNombreDeDepartamentoDTO | null> {
    return await this.useCase.getDetallePersona(id);
  }

  async crearPersona(persona: Persona): Promise<number> {
    return await this.useCase.crearPersona(persona);
  }

  async actualizarPersona(id: number, persona: Persona): Promise<number> {
    return await this.useCase.actualizarPersona(id, persona);
  }

  async eliminarPersona(id: number): Promise<number> {
    return await this.useCase.eliminarPersona(id);
  }
}