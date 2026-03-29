import { injectable } from "inversify";
import { clsMensajeUsuario } from "../../domain/entities/clsMensajeUsuario";
import { IRepositoryPersonas } from "../../domain/interfaces/Irepository/IPersonaRepository";

const API_URL = "https://juan-eaajbycgctbmbxf4.spaincentral-01.azurewebsites.net/api/personas";

@injectable()
export class PersonaRepository implements IRepositoryPersonas {

  async getListadoCompletoPersonas(): Promise<clsMensajeUsuario[]> {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `Error en la API: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data as clsMensajeUsuario[];

    } catch (error) {
      console.error("Error al obtener personas:", error);
      throw error; // importante para propagar el fallo
    }
  }
}
