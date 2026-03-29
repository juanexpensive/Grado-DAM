import { TYPES } from '@/app/core/types';
import { inject, injectable } from 'inversify';
import { DatosJuegoDTO } from '../dtos/DatosJuegoDTO';
import { ResultadoJuego } from '../entities/ResultadoJuego';
import { IRepositoryDepartamentos } from '../interfaces/repositories/IRepositoryDepartamentos';
import { IRepositoryPersonas } from '../interfaces/repositories/IRepositoryPersonas';
import { IUseCaseJuego } from '../interfaces/use-cases/IUseCaseJuego';

@injectable()
export class DefaultUseCaseJuego implements IUseCaseJuego {
  constructor(
    @inject(TYPES.IRepositoryPersonas) private repositoryPersonas: IRepositoryPersonas,
    @inject(TYPES.IRepositoryDepartamentos) private repositoryDepartamentos: IRepositoryDepartamentos
  ) {}

  /**
   * Obtiene los datos para el juego (personas y departamentos)
   */
  async obtenerDatosJuego(): Promise<DatosJuegoDTO> {
    const personas = await this.repositoryPersonas.getListaPersonas();
    const departamentos = await this.repositoryDepartamentos.getListaDepartamentos();

    // Colores predefinidos para los departamentos
    const colores = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#845EC2', '#FF9671'];

    // Mapear departamentos y asignarles color
    const departamentosJuego = departamentos.map((d, index) => ({
      ID: d.ID,
      Nombre: d.Nombre,
      Color: colores[index % colores.length]
    }));

    // Mapear personas y asignarles el color de su departamento
    const personasJuego = personas.map(p => {
      const dept = departamentosJuego.find(d => d.ID === p.IDDepartamento);
      return {
        ID: p.ID,
        Nombre: p.Nombre,
        Apellidos: p.Apellidos,
        IDDepartamento: p.IDDepartamento,
        ColorDepartamento: dept?.Color || '#ccc'
      };
    });

    return {
      Personas: personasJuego,
      Departamentos: departamentosJuego
    };
  }

  /**
   * Comprueba las asignaciones de departamentos y devuelve el resultado
   */
  async comprobarDepartamentos(asignaciones: { [key: number]: number }): Promise<ResultadoJuego> {
    const personas = await this.repositoryPersonas.getListaPersonas();
    let aciertos = 0;
    const total = personas.length;

    personas.forEach(persona => {
      if (asignaciones[persona.ID] == persona.IDDepartamento) {
        aciertos++;

        console.log("aciertos"+aciertos)
      }
      console.log("---------------------------")
      console.log("persona nombre:" +persona.Nombre,"persona iddepartamento: "+ persona.IDDepartamento,"asignaciones personaid : " +asignaciones[persona.ID])
    });

    return new ResultadoJuego(aciertos, total, aciertos === total);
  }
}