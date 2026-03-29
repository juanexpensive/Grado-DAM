import { injectable } from 'inversify';
import { Departamento } from '../../domain/entities/Departamento';
import { IRepositoryDepartamentos } from '../../domain/interfaces/repositories/IRepositoryDepartamentos';
import { ApiConfig } from '../API/ApiConfig';

@injectable()
export class DepartamentosRepositoryAPI implements IRepositoryDepartamentos {
  
  /**
   * Obtiene la lista completa de departamentos desde la API
   */
  async getListaDepartamentos(): Promise<Departamento[]> {
    try {
      const response = await fetch(ApiConfig.ENDPOINTS.DEPARTAMENTOS);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('API Departamentos raw:', data);

      // Convertir cada objeto JSON a una instancia de la clase Departamento
      const lista = Array.isArray(data) ? data : data.departamentos;

      return lista.map((json: any) => new Departamento(
        json.ID,
        json.Nombre
      ));
    } catch (error) {
      console.error('Error en getListaDepartamentos:', error);
      return [];
    }
  }

  /**
   * Obtiene un departamento específico por su ID
   */
  async getDepartamentoById(idDepartamento: number): Promise<Departamento | null> {
    try {
      const response = await fetch(`${ApiConfig.ENDPOINTS.DEPARTAMENTOS}/${idDepartamento}`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      
      const json = await response.json();
      
      return new Departamento(
        json.ID,
        json.Nombre
      );
    } catch (error) {
      console.error(`Error en getDepartamentoById(${idDepartamento}):`, error);
      return null;
    }
  }

  /**
   * Crea un nuevo departamento
   */
  async crearDepartamento(departamentoNuevo: Departamento): Promise<number> {
    try {
      const response = await fetch(ApiConfig.ENDPOINTS.DEPARTAMENTOS, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(departamentoNuevo)
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      
      return response.status;
    } catch (error) {
      console.error('Error en crearDepartamento:', error);
      return 0;
    }
  }

  /**
   * Actualiza un departamento existente
   */
  async actualizarDepartamento(idDepartamento: number, departamento: Departamento): Promise<number> {
    try {
      const response = await fetch(`${ApiConfig.ENDPOINTS.DEPARTAMENTOS}/${idDepartamento}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(departamento)
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      
      return response.status;
    } catch (error) {
      console.error(`Error en actualizarDepartamento(${idDepartamento}):`, error);
      return 0;
    }
  }

  /**
   * Elimina un departamento
   */
  async eliminarDepartamento(idDepartamento: number): Promise<number> {
    try {
      const response = await fetch(`${ApiConfig.ENDPOINTS.DEPARTAMENTOS}/${idDepartamento}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      
      return response.status;
    } catch (error) {
      console.error(`Error en eliminarDepartamento(${idDepartamento}):`, error);
      return 0;
    }
  }
}
