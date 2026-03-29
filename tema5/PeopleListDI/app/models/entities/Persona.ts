/**
 * @class Persona
 * @description Entidad que representa a una persona.
 */
export class Persona {
    private _id: number;
    private _nombre: string;
    private _apellido: string;
    private _fechaNacimiento: string;

    /**
     * @constructor
     * @param {number} id - Identificador único de la persona.
     * @param {string} nombre - Nombre de la persona.
     * @param {string} apellido - Apellido de la persona.
     * @param {string} fechaNacimiento - Fecha de nacimiento de la persona (formato: YYYY-MM-DD).
     */
    constructor(id: number, nombre: string, apellido: string, fechaNacimiento: string) {
        this._id = id;
        this._nombre = nombre;
        this._apellido = apellido;
        this._fechaNacimiento = fechaNacimiento;
    }

    /**
     * @method id
     * @description Obtiene el identificador de la persona.
     * @returns {number} El ID.
     */
    public get id(): number {
        return this._id;
    }

    /**
     * @method nombre
     * @description Obtiene el nombre de la persona.
     * @returns {string} El nombre.
     */
    public get nombre(): string {
        return this._nombre;
    }

    /**
     * @method apellido
     * @description Obtiene el apellido de la persona.
     * @returns {string} El apellido.
     */
    public get apellido(): string {
        return this._apellido;
    }

    /**
     * @method fechaNacimiento
     * @description Obtiene la fecha de nacimiento de la persona.
     * @returns {string} La fecha de nacimiento (YYYY-MM-DD).
     */
    public get fechaNacimiento(): string {
        return this._fechaNacimiento;
    }

    /**
     * @method nombreCompleto
     * @description Combina el nombre y el apellido.
     * @returns {string} El nombre completo (Nombre Apellido).
     */
    public get nombreCompleto(): string {
        return `${this._nombre} ${this._apellido}`;
    }
}
