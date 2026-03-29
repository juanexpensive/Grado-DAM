export class Persona {
    private _id: number;
    private _nombre: string;
    private _apellido: string;
    private _fechaNacimiento: string;
    private _direccion: string;
    private _telefono: string;
    private _imagen: string;
    private _idDepartamento: number;


    constructor(id: number, nombre: string, apellido: string, fechaNacimiento: string, direccion: string, telefono: string, imagen: string, idDepartamento: number) {
        this._id = id;
        this._nombre = nombre;
        this._apellido = apellido;
        this._fechaNacimiento = fechaNacimiento;
        this._direccion = direccion
        this._telefono = telefono
        this._imagen = imagen
        this._idDepartamento = idDepartamento
    }


    public get id(): number {
        return this._id;
    }


    public get nombre(): string {
        return this._nombre;
    }


    public get apellido(): string {
        return this._apellido;
    }


    public get fechaNacimiento(): string {
        return this._fechaNacimiento;
    }

    public get direccion(): string {
        return this._direccion;
    }

    public get telefono(): string {
        return this._telefono;
    }

    public get imagen(): string {
        return this._imagen;
    }

    public get idDepartamento(): number {
        return this._idDepartamento;
    }

    public get nombreCompleto(): string {
        return `${this._nombre} ${this._apellido}`;
    }
}