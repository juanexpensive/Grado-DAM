using Domain.Entities;
using DOMAIN.UseCases.interfaces;


namespace DATA.Repositories
{
    public class PeopleRepository : IPeopleRepository
    {
        /// <summary>
        /// Función que nos devuelve un listado de todas las personas
        /// pre: none
        /// post: el listado contiene 10 personas inventadas
        /// </summary>
        /// <returns>Listado de personas</returns>
        public List<clsPersona> getPeopleListRep()
        {
            // Simula datos de una base de datos o una API
            return new List<clsPersona>
           {
                new clsPersona(1, "Juan", "Pérez Gómez", new DateTime(1985, 3, 12), "Calle Mayor 10, Madrid", "600123456"),
                new clsPersona(2, "Ana", "García López", new DateTime(1990, 7, 24), "Av. Diagonal 250, Barcelona", "611223344"),
                new clsPersona(3, "Carlos", "Ruiz Fernández", new DateTime(1978, 1, 8), "Calle Colón 45, Valencia", "622334455"),
                new clsPersona(4, "Lucía", "Martínez Torres", new DateTime(1995, 5, 15), "Gran Vía 100, Madrid", "633445566"),
                new clsPersona(5, "Miguel", "Sánchez Ortega", new DateTime(1982, 11, 3), "Paseo del Prado 22, Madrid", "644556677"),
                new clsPersona(6, "Elena", "Morales Díaz", new DateTime(1998, 9, 29), "Calle Serrano 75, Madrid", "655667788"),
                new clsPersona(7, "Pedro", "Navarro Gómez", new DateTime(1987, 6, 18), "Calle Real 12, Sevilla", "666778899"),
                new clsPersona(8, "Sara", "Hernández Castro", new DateTime(1993, 12, 5), "Av. Libertad 8, Bilbao", "677889900"),
                new clsPersona(9, "David", "López Cano", new DateTime(1975, 4, 27), "Calle Nueva 33, Málaga", "688990011"),
                new clsPersona(10, "Laura", "Jiménez Martín", new DateTime(1999, 2, 10), "Plaza España 4, Zaragoza", "699001122")
            };
        }


    }
}

