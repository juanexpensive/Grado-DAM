import { injectable } from "inversify";
import { Persona } from "../entities/Persona";

export interface IRepositoryPersonas {
  getListadoCompletoPersonas(): Persona[];
}

@injectable()
export class PersonasRepository implements IRepositoryPersonas {
  getListadoCompletoPersonas(): Persona[] {
    // En un futuro, esto podría hacer llamadas a una API que nos ofreciera los datos
    return [
      new Persona(1, "Fernando", "Galiana Fernández", "1990-03-15"),
      new Persona(2, "Carlos", "Martínez López", "1988-07-22"),
      new Persona(3, "Ana", "Rodríguez Pérez", "1995-01-09"),
      new Persona(4, "Miguel", "Sánchez Ruiz", "1992-11-30"),
      new Persona(5, "Laura", "Torres Díaz", "1998-05-12"),
      new Persona(6, "David", "Moreno García", "1991-09-03"),
      new Persona(7, "Elena", "Jiménez Castro", "1996-02-25"),
    ];
  }
}

@injectable()
export class PersonasRepositoryEmpty implements IRepositoryPersonas {
  getListadoCompletoPersonas(): Persona[] {
    return [];
  }
}

@injectable()
export class PersonasRepository100 implements IRepositoryPersonas {
  getListadoCompletoPersonas(): Persona[] {
    const personas: Persona[] = [];

    for (let i = 1; i <= 100; i++) {
      personas.push(
        new Persona(i, `Persona${i}`, `Apellido${i}`, `Fecha Nacimiento${}`)
      );
    }

    return personas;
  }
  @injectable()
  export class PersonaSeleccionadaRandom implements IRepositoryPersonas {
  int position = [Date]
  getListadoCompletoPersonas(): Persona[position]
}
}
