import { injectable } from "inversify";
import { Persona } from "../../domain/entities/Persona";
import { IRepositoryPersonasAzure } from "../../domain/interfaces/repositories/IRepositoryPersonasAzure";

const API_URL =
  "https://juan-eaajbycgctbmbxf4.spaincentral-01.azurewebsites.net/api/personas";

@injectable()
export class PersonaRepositoryAzure implements IRepositoryPersonasAzure {
  async getListadoCompletoPersonas(): Promise<Persona[]> {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `Error en la API: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      return data as Persona[];
    } catch (error) {
      console.error("Error al obtener personas:", error);
      throw error; // importante para propagar el fallo
    }
  }
}
