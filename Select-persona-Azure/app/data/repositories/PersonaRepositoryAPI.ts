import { Persona } from '../../domain/entities/Persona';
import { IRepositoryPersonas } from '../../domain/interfaces/repositories/IRepositoryPersonas';
import { ApiConfig } from '../API/ApiConfig';

export class PersonasRepositoryAPI implements IRepositoryPersonas {
  async getListaPersonas(): Promise<Persona[]> {
    try {
      const response = await fetch(ApiConfig.ENDPOINTS.PERSONAS);
      if (!response.ok) throw new Error('Error al obtener personas');
      const rawText = await response.text();
      console.debug('GET personas raw response status:', response.status);
      console.debug('GET personas raw response body:', rawText);
      const data = JSON.parse(rawText || '[]');
      return data.map((json: any) => {
        const id = json.id ?? json.ID ?? 0;
        const nombre = json.nombre ?? json.Nombre ?? '';
        const apellidos = json.apellidos ?? json.apellido ?? json.Apellidos ?? '';
        const fechaNacimiento = json.fechaNacimiento ?? json.fechaNac ?? json.FechaNacimiento ?? '';
        const direccion = json.direccion ?? json.Direccion ?? '';
        const telefono = json.telefono ?? json.Telefono ?? '';
        const foto = json.foto ?? json.imagen ?? json.Foto ?? '';
        const idDepartamento = json.idDepartamento ?? json.IDDepartamento ?? 0;
        return new Persona(
          id,
          nombre,
          apellidos,
          fechaNacimiento,
          direccion,
          telefono,
          foto,
          idDepartamento
        );
      });
    } catch (error) {
      console.error('Error en getListaPersonas:', error);
      return [];
    }
  }

  async getPersonaById(idPersona: number): Promise<Persona | null> {
    try {
      const response = await fetch(`${ApiConfig.ENDPOINTS.PERSONAS}/${idPersona}`);
      if (!response.ok) throw new Error('Error al obtener persona');
      const rawText = await response.text();
      console.debug(`GET persona/${idPersona} raw response status:`, response.status);
      console.debug(`GET persona/${idPersona} raw response body:`, rawText);
      const json = JSON.parse(rawText || 'null');
      const id = json.id ?? json.ID ?? 0;
      const nombre = json.nombre ?? json.Nombre ?? '';
      const apellidos = json.apellidos ?? json.apellido ?? json.Apellidos ?? '';
      const fechaNacimiento = json.fechaNacimiento ?? json.fechaNac ?? json.FechaNacimiento ?? '';
      const direccion = json.direccion ?? json.Direccion ?? '';
      const telefono = json.telefono ?? json.Telefono ?? '';
      const foto = json.foto ?? json.imagen ?? json.Foto ?? '';
      const idDepartamento = json.idDepartamento ?? json.IDDepartamento ?? 0;
      return new Persona(
        id,
        nombre,
        apellidos,
        fechaNacimiento,
        direccion,
        telefono,
        foto,
        idDepartamento
      );
    } catch (error) {
      console.error('Error en getPersonaById:', error);
      return null;
    }
  }

  async crearPersona(personaNueva: Persona): Promise<number> {
    try {
      const response = await fetch(ApiConfig.ENDPOINTS.PERSONAS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personaNueva)
      });
      if (!response.ok) throw new Error('Error al crear persona');
      return response.status;
    } catch (error) {
      console.error('Error en crearPersona:', error);
      return 0;
    }
  }

  async actualizarPersona(idPersona: number, persona: Persona): Promise<number> {
    try {
      const response = await fetch(`${ApiConfig.ENDPOINTS.PERSONAS}/${idPersona}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(persona)
      });
      if (!response.ok) throw new Error('Error al actualizar persona');
      return response.status;
    } catch (error) {
      console.error('Error en actualizarPersona:', error);
      return 0;
    }
  }

  async eliminarPersona(idPersona: number): Promise<number> {
    try {
      const response = await fetch(`${ApiConfig.ENDPOINTS.PERSONAS}/${idPersona}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error al eliminar persona');
      return response.status;
    } catch (error) {
      console.error('Error en eliminarPersona:', error);
      return 0;
    }
  }

  async contarPersonaDepartamento(idDepartamento: number): Promise<number> {
    try {
      const personas = await this.getListaPersonas();
      return personas.filter(p => p.IDDepartamento === idDepartamento).length;
    } catch (error) {
      console.error('Error en contarPersonaDepartamento:', error);
      return 0;
    }
  }
}