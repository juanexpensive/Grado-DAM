export class Persona {
  ID: number;
  Nombre: string;
  Apellidos: string;
  FechaNacimiento: string;
  Direccion: string;
  Telefono: string;
  Foto: string;
  IDDepartamento: number;

  constructor(
    id: number,
    nombre: string,
    apellidos: string,
    fechaNacimiento: string,
    direccion: string,
    telefono: string,
    foto: string,
    idDepartamento: number,
  ) {
    this.ID = id;
    this.Nombre = nombre;
    this.Apellidos = apellidos;
    this.FechaNacimiento = fechaNacimiento;
    this.Direccion = direccion;
    this.Telefono = telefono;
    this.Foto = foto;
    this.IDDepartamento = idDepartamento;
  }
}
