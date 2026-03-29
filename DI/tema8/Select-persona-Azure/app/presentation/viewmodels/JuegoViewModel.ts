import { useState } from 'react';
import { IUseCaseJuego } from '../../domain/interfaces/use-cases/IUseCaseJuego';
import { PersonaJuegoConColor, DepartamentoJuegoConColor, ColorMapper } from '../mapper/ColorMapper';
import { ResultadoJuego } from '../../domain/entities/ResultadoJuego';

export class JuegoViewModel {
  private useCase: IUseCaseJuego;

  constructor(useCase: IUseCaseJuego) {
    this.useCase = useCase;
  }

  async cargarDatosJuego(): Promise<{
    personas: PersonaJuegoConColor[];
    departamentos: DepartamentoJuegoConColor[];
  }> {
    const datos = await this.useCase.obtenerDatosJuego();
    
    return {
      personas: ColorMapper.mapPersonasConColor(datos.Personas),
      departamentos: ColorMapper.mapDepartamentosConColor(datos.Departamentos)
    };
  }

  async comprobarRespuestas(asignaciones: { [key: number]: number }): Promise<ResultadoJuego> {
    return await this.useCase.comprobarDepartamentos(asignaciones);
  }
}