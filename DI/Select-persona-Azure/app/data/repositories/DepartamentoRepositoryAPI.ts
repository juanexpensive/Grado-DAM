import { IRepositoryDepartamentos } from '../../domain/interfaces/repositories/IRepositoryDepartamentos';
import { Departamento } from '../../domain/entities/Departamento';
import { ApiConfig } from '../API/ApiConfig';

export class DepartamentosRepositoryAPI implements IRepositoryDepartamentos {
  async getListaDepartamentos(): Promise<Departamento[]> {
    try {
      const response = await fetch(ApiConfig.ENDPOINTS.DEPARTAMENTOS);
      if (!response.ok) throw new Error('Error al obtener departamentos');
      const data = await response.json();
      return data.map((json: any) => new Departamento(json.id, json.nombre));
    } catch (error) {
      console.error('Error en getListaDepartamentos:', error);
      return [];
    }
  }

  async getDepartamentoById(idDepartamento: number): Promise<Departamento | null> {
    try {
      const response = await fetch(`${ApiConfig.ENDPOINTS.DEPARTAMENTOS}/${idDepartamento}`);
      if (!response.ok) throw new Error('Error al obtener departamento');
      const json = await response.json();
      return new Departamento(json.id, json.nombre);
    } catch (error) {
      console.error('Error en getDepartamentoById:', error);
      return null;
    }
  }

  async crearDepartamento(departamentoNuevo: Departamento): Promise<number> {
    try {
      const response = await fetch(ApiConfig.ENDPOINTS.DEPARTAMENTOS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(departamentoNuevo)
      });
      if (!response.ok) throw new Error('Error al crear departamento');
      return response.status;
    } catch (error) {
      console.error('Error en crearDepartamento:', error);
      return 0;
    }
  }

  async actualizarDepartamento(idDepartamento: number, departamento: Departamento): Promise<number> {
    try {
      const response = await fetch(`${ApiConfig.ENDPOINTS.DEPARTAMENTOS}/${idDepartamento}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(departamento)
      });
      if (!response.ok) throw new Error('Error al actualizar departamento');
      return response.status;
    } catch (error) {
      console.error('Error en actualizarDepartamento:', error);
      return 0;
    }
  }

  async eliminarDepartamento(idDepartamento: number): Promise<number> {
    try {
      const response = await fetch(`${ApiConfig.ENDPOINTS.DEPARTAMENTOS}/${idDepartamento}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error al eliminar departamento');
      return response.status;
    } catch (error) {
      console.error('Error en eliminarDepartamento:', error);
      return 0;
    }
  }
}
