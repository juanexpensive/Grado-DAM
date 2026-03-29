import { Departamento } from '../../entities/Departamento';

export interface IRepositoryDepartamentos {
  getListaDepartamentos(): Promise<Departamento[]>;
  crearDepartamento(departamentoNuevo: Departamento): Promise<number>;
  actualizarDepartamento(idDepartamento: number, departamento: Departamento): Promise<number>;
  eliminarDepartamento(idDepartamento: number): Promise<number>;
  getDepartamentoById(idDepartamento: number): Promise<Departamento | null>;
}
