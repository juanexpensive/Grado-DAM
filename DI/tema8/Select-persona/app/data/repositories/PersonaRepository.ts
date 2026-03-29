import { injectable } from "inversify";
import { Persona } from "../../domain/entities/Persona";
import { IRepositoryPersonas } from "../../domain/interfaces/repositories/IRepositoryPersonas";

@injectable()
export class PersonasRepository implements IRepositoryPersonas{

    getListadoCompletoPersonas(): Persona[] {
        //En un futuro, esto podría hacer llamadas a una API que nos ofreciera los datos
        return [
            new Persona(1, 'Fernando', 'Galiana Fernández', '22-03-2003', 'C/ Mayor 12, Madrid', '600123456', 'fernando.jpg', 1),
            new Persona(2, 'Carlos', 'Martínez López', '15-07-2000', 'Av. Andalucía 45, Sevilla', '600234567', 'carlos.jpg', 2),
            new Persona(3, 'Ana', 'Rodríguez Pérez', '03-11-2002', 'C/ Sol 78, Valencia', '600345678', 'ana.jpg', 1),
            new Persona(4, 'Miguel', 'Sánchez Ruiz', '28-01-1999', 'C/ Luna 10, Barcelona', '600456789', 'miguel.jpg', 3),
            new Persona(5, 'Laura', 'Torres Díaz', '09-09-2001', 'C/ Esperanza 33, Bilbao', '600567890', 'laura.jpg', 2),
            new Persona(6, 'David', 'Moreno García', '12-05-2004', 'Av. Castilla 5, Málaga', '600678901', 'david.jpg', 3),
        ];
    }
}
