import { Departamento } from '../../entities/Departamento';
import { Persona } from '../../entities/Persona';

export interface IUseCaseDepartamentos {
  getDepartamentos(): Promise<Departamento[]>;
  getDetalleDepartamento(id: number): Promise<Departamento | null>;
  getPersonasPorDepartamento(id: number): Promise<Persona[]>;
  crearDepartamento(departamento: Departamento): Promise<void>;
  actualizarDepartamento(departamento: Departamento): Promise<void>;
  eliminarDepartamento(id: number): Promise<void>;
}