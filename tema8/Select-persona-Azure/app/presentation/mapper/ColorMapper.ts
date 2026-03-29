import { DepartamentoJuegoDTO } from '../../domain/dtos/DepartamentoJuegoDTO';
import { PersonaJuegoDTO } from '../../domain/dtos/PersonaJuegoDTO';

export interface PersonaJuegoConColor extends PersonaJuegoDTO {
  colorDepartamento: string;
}

export interface DepartamentoJuegoConColor extends DepartamentoJuegoDTO {
  color: string;
}

export class ColorMapper {
  private static coloresDepartamentos: { [key: number]: string } = {
    1: '#FF6B6B',
    2: '#4ECDC4',
    3: '#45B7D1',
    4: '#FFA07A',
    5: '#98D8C8',
    6: '#F7DC6F',
    7: '#BB8FCE',
    8: '#85C1E2'
  };

  static obtenerColorParaDepartamento(idDepartamento: number): string {
    return this.coloresDepartamentos[idDepartamento] || '#E0E0E0';
  }

  static mapPersonaConColor(persona: PersonaJuegoDTO): PersonaJuegoConColor {
    return {
      ...persona,
      colorDepartamento: this.obtenerColorParaDepartamento(persona.IDDepartamento)
    };
  }

  static mapDepartamentoConColor(departamento: DepartamentoJuegoDTO): DepartamentoJuegoConColor {
    return {
      ...departamento,
      color: this.obtenerColorParaDepartamento(departamento.ID)
    };
  }

  static mapPersonasConColor(personas: PersonaJuegoDTO[]): PersonaJuegoConColor[] {
    return personas.map(p => this.mapPersonaConColor(p));
  }

  static mapDepartamentosConColor(departamentos: DepartamentoJuegoDTO[]): DepartamentoJuegoConColor[] {
    return departamentos.map(d => this.mapDepartamentoConColor(d));
  }
}
