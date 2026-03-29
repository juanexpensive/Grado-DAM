import { RepositoryPersona } from '../models/data/RepositoryPersona';
import { Persona } from '../models/entities/PersonaModel';

/**
 * @class IndexVM
 * @description ViewModel (Modelo de Vista) para la pantalla de índice/lista.
 * Contiene la lógica y el estado de la vista, interactuando con el repositorio de datos.
 */
export class IndexVM {

    private _personas: Persona[];
    private _personaSeleccionada: Persona | null = null;

    /**
     * @constructor
     * @description Inicializa el ViewModel y carga la lista de personas desde el repositorio.
     */
    constructor(){
        // Carga inicial de datos al construir la instancia del ViewModel.
        this._personas = RepositoryPersona.getAll();
    }

    /**
     * @method PersonaSeleccionada
     * @description Setter que establece la persona actualmente seleccionada por el usuario.
     * @param {Persona} item - El objeto Persona que ha sido seleccionado.
     */
    public set PersonaSeleccionada(item: Persona){
        this._personaSeleccionada = item;
        this.alertPersonaSeleccionada()
    }

    /**
     * @method alertPersonaSeleccionada
     * @private
     * @description Muestra una alerta con el nombre de la persona seleccionada actualmente.
     * No espera parámetros.
     * No devuelve nada (void).
     */
    private alertPersonaSeleccionada(){
        alert(`La persona seleccionada es: ${this._personaSeleccionada?.nombre}`)
    }

    /**
     * @method Personas
     * @description Getter que proporciona la lista completa de personas.
     * @returns {Persona[]} La lista de objetos Persona.
     */
    public get Personas() {
        return this._personas;
    }
}