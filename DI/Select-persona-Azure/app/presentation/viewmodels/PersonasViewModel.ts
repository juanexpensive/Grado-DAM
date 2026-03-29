import { inject } from 'inversify';
import { TYPES } from "../../core/types";
import { PersonaConNombreDeDepartamentoDTO } from '../../domain/dtos/PersonaConNombreDeDepartamentoDTO';
import { Persona } from '../../domain/entities/Persona';
import { IUseCasePersonas } from '../../domain/interfaces/use-cases/IUseCasePersonas';

export class PersonasViewModel {
  private useCase: IUseCasePersonas;
  private _personaSeleccionada: Persona;

  constructor(
    @inject(TYPES.IUseCasePersonas)
    useCase: IUseCasePersonas) 
    {
    this.useCase = useCase;
    this._personaSeleccionada = new Persona(0,"","","","","","",0);    
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
  public get personaSeleccionada(): Persona {
    return this._personaSeleccionada;
  }
  public set personaSeleccionada(value: Persona) {
    this._personaSeleccionada = value;
    alert(`Persona seleccionada en el VM: ${this._personaSeleccionada.Nombre} ${this._personaSeleccionada.Apellidos}`);
  }
  
}