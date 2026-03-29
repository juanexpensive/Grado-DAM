import { Persona } from '../entities/PersonaModel';

/**
 * @class RepositoryPersona
 * @description Repositorio estático para gestionar los datos de Persona.
 * Simula una fuente de datos (DB, API, etc.).
 */
export class RepositoryPersona {
    /**
     * @property {Persona[]} personas
     * @description Lista estática de objetos Persona.
     */
    private static readonly personas: Persona[] = [
        new Persona(1, 'Lucía', 'García'),
        new Persona(2, 'Mateo', 'Rodríguez'),
        new Persona(3, 'Carmen', 'Fernández'),
        new Persona(4, 'Adrián', 'López'),
        new Persona(5, 'Valeria', 'Martínez'),
        new Persona(6, 'Sergio', 'Sánchez'),
        new Persona(7, 'Irene', 'Pérez'),
        new Persona(8, 'Hugo', 'González'),
        new Persona(9, 'Nerea', 'Ruiz'),
        new Persona(10, 'Daniel', 'Gómez'),
        new Persona(11, 'Marina', 'Díaz'),
        new Persona(12, 'Pablo', 'Moreno'),
        new Persona(13, 'Aitana', 'Álvarez'),
        new Persona(14, 'Leo', 'Romero'),
        new Persona(15, 'Noa', 'Alonso'),
        new Persona(16, 'Álvaro', 'Gutierrez'),
        new Persona(17, 'Sofía', 'Navarro'),
        new Persona(18, 'David', 'Torres'),
    ];

    /**
     * @method getAll
     * @description Devuelve la lista completa de personas.
     * @returns {Persona[]} La lista de todas las personas.
     */
    public static getAll(): Persona[] {
        return this.personas;
    }
}