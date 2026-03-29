import { injectable } from 'inversify';
import { IRepositoryPersonas } from '../../domain/interfaces/repositories/IRepositoryPersonas';
import { Persona } from '../../domain/entities/Persona';
import { ApiConfig } from '../API/ApiConfig';

@injectable()
export class PersonasRepositoryAPI implements IRepositoryPersonas {

  /**
   * Obtiene la lista completa de personas desde la API
   */
  async getListaPersonas(): Promise<Persona[]> {
    try {
      const response = await fetch(ApiConfig.ENDPOINTS.PERSONAS);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Personas raw:', data);

      // Adaptar según lo que devuelve tu API
      const lista = Array.isArray(data) ? data : data.personas;

      return lista.map((json: any) => new Persona(
        json.ID,
        json.Nombre,
        json.Apellidos,
        json.FechaNacimiento,
        json.Direccion,
        json.Telefono,
        json.Foto,
        json.IDDepartamento
      ));
    } catch (error) {
      console.error('Error en getListaPersonas:', error);
      throw error; // para que el use case lo maneje
    }
  }

  /**
   * Obtiene una persona específica por su ID
   */
  async getPersonaById(idPersona: number): Promise<Persona | null> {
    try {
      const response = await fetch(`${ApiConfig.ENDPOINTS.PERSONAS}/${idPersona}`);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      return new Persona(
        json.ID,
        json.Nombre,
        json.Apellidos,
        json.FechaNacimiento,
        json.Direccion,
        json.Telefono,
        json.Foto,
        json.IDDepartamento
      );
    } catch (error) {
      console.error(`Error en getPersonaById(${idPersona}):`, error);
      return null;
    }
  }

  /**
   * Crea una nueva persona
   */
  async crearPersona(personaNueva: Persona): Promise<number> {
    try {
      const response = await fetch(ApiConfig.ENDPOINTS.PERSONAS, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(personaNueva)
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }

      return response.status;
    } catch (error) {
      console.error('Error en crearPersona:', error);
      throw error;
    }
  }

  /**
   * Actualiza una persona existente
   */
  async actualizarPersona(idPersona: number, persona: Persona): Promise<number> {
    try {
      const response = await fetch(`${ApiConfig.ENDPOINTS.PERSONAS}/${idPersona}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(persona)
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }

      return response.status;
    } catch (error) {
      console.error(`Error en actualizarPersona(${idPersona}):`, error);
      throw error;
    }
  }

  /**
   * Elimina una persona
   */
  async eliminarPersona(idPersona: number): Promise<number> {
    try {
      const response = await fetch(`${ApiConfig.ENDPOINTS.PERSONAS}/${idPersona}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }

      return response.status;
    } catch (error) {
      console.error(`Error en eliminarPersona(${idPersona}):`, error);
      throw error;
    }
  }

  /**
   * Cuenta cuántas personas pertenecen a un departamento específico
   */
  async contarPersonaDepartamento(idDepartamento: number): Promise<number> {
    try {
      const personas = await this.getListaPersonas();
      return personas.filter(p => p.IDDepartamento === idDepartamento).length;
    } catch (error) {
      console.error(`Error en contarPersonaDepartamento(${idDepartamento}):`, error);
      throw error;
    }
  }
}
