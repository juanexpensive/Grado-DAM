using DOMAIN.Entities.CRUDPersonasDomain.Entities;
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
                new clsPersona(10, "Laura", "Jiménez Martín", new DateTime(1999, 2, 10), "Plaza España 4, Zaragoza", "699001122"),
// --- 90 PERSONAS ADICIONALES CREADAS MANUALMENTE (ID 11 a 100) ---
                new clsPersona(11, "Javier", "Vidal Molina", new DateTime(1991, 10, 5), "Calle Sol 1, A Coruña", "701112233"),
                new clsPersona(12, "Sofía", "Ramos Gil", new DateTime(1984, 1, 17), "Paseo Marítimo 55, Cádiz", "702223344"),
                new clsPersona(13, "Pablo", "Herrera Soto", new DateTime(1979, 11, 23), "Plaza Norte 2, Valladolid", "703334455"),
                new clsPersona(14, "Valeria", "Prieto Bravo", new DateTime(1996, 8, 8), "Av. de la Paz 7, Granada", "704445566"),
                new clsPersona(15, "Ricardo", "Peña Vázquez", new DateTime(1980, 5, 2), "Calle Baja 12, León", "705556677"),
                new clsPersona(16, "Carmen", "Calvo Marín", new DateTime(1972, 9, 30), "Ronda del Sur 3, Tarragona", "706667788"),
                new clsPersona(17, "Álvaro", "Sáez Pascual", new DateTime(1988, 12, 1), "Calle Ancha 99, Pamplona", "707778899"),
                new clsPersona(18, "Paula", "Reyes Arias", new DateTime(1994, 6, 14), "Av. Central 21, Oviedo", "708889900"),
                new clsPersona(19, "Mario", "Díaz Pérez", new DateTime(1983, 3, 22), "Calle Río 5, Santander", "709990011"),
                new clsPersona(20, "Nuria", "Gómez López", new DateTime(1992, 7, 1), "Plaza Mayor 8, Burgos", "710112233"),
                new clsPersona(21, "Gonzalo", "Ortega Gil", new DateTime(1986, 4, 11), "Travesía 15, Salamanca", "711223344"),
                new clsPersona(22, "Teresa", "Méndez Ruiz", new DateTime(1975, 12, 25), "Av. Europa 6, Logroño", "712334455"),
                new clsPersona(23, "Adrián", "Velasco Rico", new DateTime(1997, 2, 3), "Paseo Alto 22, Vitoria", "713445566"),
                new clsPersona(24, "Blanca", "Serrano Castro", new DateTime(1981, 6, 9), "Calle Larga 88, Albacete", "714556677"),
                new clsPersona(25, "Héctor", "Prieto Sanz", new DateTime(1993, 11, 19), "Gran Avenida 40, Alicante", "715667788"),
                new clsPersona(26, "Irene", "Muñoz Vega", new DateTime(1977, 8, 28), "Calle del Agua 14, Jaén", "716778899"),
                new clsPersona(27, "Raúl", "Torres Solís", new DateTime(1989, 5, 1), "Rambla 10, Girona", "717889900"),
                new clsPersona(28, "Diana", "Gil Cano", new DateTime(1995, 1, 6), "Vía Principal 5, Huelva", "718990011"),
                new clsPersona(29, "Alejandro", "Peña Cruz", new DateTime(1970, 9, 13), "Pza. Redonda 3, Badajoz", "719001122"),
                new clsPersona(30, "Marta", "Ríos León", new DateTime(1985, 3, 20), "Calle Nueva 50, Cáceres", "720112233"),
                new clsPersona(31, "Félix", "Cano Vidal", new DateTime(1998, 11, 2), "Av. Marítima 9, Cartagena", "721223344"),
                new clsPersona(32, "Lorena", "Martín Soto", new DateTime(1982, 12, 7), "Calle Central 11, Soria", "722334455"),
                new clsPersona(33, "Germán", "Ramos Ruiz", new DateTime(1976, 4, 21), "Plaza Vieja 4, Guadalajara", "723445566"),
                new clsPersona(34, "Cristina", "Jiménez Gil", new DateTime(1990, 10, 26), "Paseo Norte 18, Segovia", "724556677"),
                new clsPersona(35, "Daniel", "Herrera Gómez", new DateTime(1994, 7, 19), "Ronda del Este 2, Ávila", "725667788"),
                new clsPersona(36, "Rocío", "Fernández López", new DateTime(1971, 5, 16), "Calle del Oeste 30, Teruel", "726778899"),
                new clsPersona(37, "Guillermo", "García Navarro", new DateTime(1987, 9, 2), "Av. Principal 77, Cuenca", "727889900"),
                new clsPersona(38, "Nerea", "Sánchez Ortega", new DateTime(1996, 3, 1), "Callejón 1, Zamora", "728990011"),
                new clsPersona(39, "Vicente", "Morales Díaz", new DateTime(1980, 1, 29), "Pza. Pequeña 6, Huesca", "729001122"),
                new clsPersona(40, "Andrea", "Ruiz Martín", new DateTime(1993, 8, 10), "Av. Litoral 24, Castellón", "730112233"),
                new clsPersona(41, "Emilio", "López Torres", new DateTime(1974, 11, 4), "Calle Interior 3, Lleida", "731223344"),
                new clsPersona(42, "Beatriz", "Pérez Bravo", new DateTime(1988, 6, 23), "Paseo Fluvial 16, Ourense", "732334455"),
                new clsPersona(43, "Marcos", "Castro León", new DateTime(1999, 4, 18), "Av. del Sur 90, Pontevedra", "733445566"),
                new clsPersona(44, "Silvia", "Bravo Rico", new DateTime(1973, 2, 7), "Rúa Maior 5, Lugo", "734556677"),
                new clsPersona(45, "Ismael", "León Soto", new DateTime(1981, 9, 12), "Calle Nueva 4, Palencia", "735667788"),
                new clsPersona(46, "Natalia", "Rico Cruz", new DateTime(1995, 12, 3), "Pza. de la Luz 13, Melilla", "736778899"),
                new clsPersona(47, "Julio", "Gallego Vega", new DateTime(1978, 7, 27), "Av. Mediterráneo 10, Ceuta", "737889900"),
                new clsPersona(48, "Esther", "Vega Gil", new DateTime(1991, 3, 21), "Calle Principal 29, Vigo", "738990011"),
                new clsPersona(49, "Samuel", "Cruz Ramos", new DateTime(1986, 1, 15), "Ronda Exterior 6, Gijón", "739001122"),
                new clsPersona(50, "Berta", "Solís Sáez", new DateTime(1992, 10, 8), "Paseo de las Flores 1, Elche", "740112233"),
                new clsPersona(51, "César", "Sáez Vidal", new DateTime(1977, 4, 2), "Calle del Puerto 33, Marbella", "741223344"),
                new clsPersona(52, "Inés", "Torres Ramos", new DateTime(1985, 11, 29), "Av. de los Pinos 55, Dos Hermanas", "742334455"),
                new clsPersona(53, "Jonatan", "Cano Sanz", new DateTime(1997, 6, 16), "Pza. Central 12, Móstoles", "743445566"),
                new clsPersona(54, "Helena", "Velasco Rico", new DateTime(1983, 1, 24), "Calle de Abajo 8, Fuenlabrada", "744556677"),
                new clsPersona(55, "Arturo", "Serrano Castro", new DateTime(1979, 8, 13), "Vía Láctea 9, Alcalá de Henares", "745667788"),
                new clsPersona(56, "Vanesa", "Prieto Sanz", new DateTime(1994, 3, 7), "Calle del Medio 17, Getafe", "746778899"),
                new clsPersona(57, "Israel", "Muñoz Vega", new DateTime(1989, 12, 4), "Av. de la Música 22, Alcorcón", "747889900"),
                new clsPersona(58, "Olga", "Torres Solís", new DateTime(1976, 5, 26), "Ronda Interior 4, Leganés", "748990011"),
                new clsPersona(59, "Francisco", "Gil Cano", new DateTime(1990, 2, 1), "Paseo del Río 38, Parla", "749001122"),
                new clsPersona(60, "Susana", "Peña Cruz", new DateTime(1987, 10, 17), "Calle Mayor 101, Torrejón de Ardoz", "750112233"),
                new clsPersona(61, "Aitor", "Ríos León", new DateTime(1993, 5, 29), "Av. Europa 5, Alcobendas", "751223344"),
                new clsPersona(62, "Nuria", "Cano Vidal", new DateTime(1975, 11, 8), "Calle del Aire 1, Roquetas de Mar", "752334455"),
                new clsPersona(63, "Óscar", "Martín Soto", new DateTime(1982, 9, 25), "Plaza del Sol 7, Jerez de la Frontera", "753445566"),
                new clsPersona(64, "Silvia", "Ramos Ruiz", new DateTime(1996, 4, 14), "Av. del Sur 19, Donostia-San Sebastián", "754556677"),
                new clsPersona(65, "Vicente", "Jiménez Gil", new DateTime(1970, 7, 3), "Calle de la Playa 5, Telde", "755667788"),
                new clsPersona(66, "Yanira", "Herrera Gómez", new DateTime(1984, 12, 18), "Paseo Marítimo 2, Barakaldo", "756778899"),
                new clsPersona(67, "Fidel", "Fernández López", new DateTime(1998, 2, 22), "Ronda Exterior 1, Dos Hermanas", "757889900"),
                new clsPersona(68, "Gina", "García Navarro", new DateTime(1981, 6, 6), "Calle del Norte 14, Almería", "758990011"),
                new clsPersona(69, "Hugo", "Sánchez Ortega", new DateTime(1995, 10, 31), "Av. de Andalucía 2, Sabadell", "759001122"),
                new clsPersona(70, "Kelly", "Morales Díaz", new DateTime(1972, 3, 15), "Plaza de la Villa 3, Terrassa", "760112233"),
                new clsPersona(71, "Iván", "Ruiz Martín", new DateTime(1986, 8, 4), "Calle Principal 20, Burgos", "761223344"),
                new clsPersona(72, "Zoe", "López Torres", new DateTime(1990, 1, 28), "Paseo de Gracia 8, Cornellà de Llobregat", "762334455"),
                new clsPersona(73, "Koldo", "Pérez Bravo", new DateTime(1977, 9, 17), "Av. del Centro 1, Badalona", "763445566"),
                new clsPersona(74, "Leire", "Castro León", new DateTime(1993, 6, 12), "Ronda Poniente 11, Leganés", "764556677"),
                new clsPersona(75, "Manuel", "Bravo Rico", new DateTime(1980, 4, 25), "Calle Larga 2, Móstoles", "765667788"),
                new clsPersona(76, "Ruth", "León Soto", new DateTime(1996, 11, 1), "Av. de la Luz 10, Fuenlabrada", "766778899"),
                new clsPersona(77, "Néstor", "Rico Cruz", new DateTime(1974, 5, 20), "Plaza Mayor 5, Getafe", "767889900"),
                new clsPersona(78, "Tamara", "Gallego Vega", new DateTime(1988, 12, 9), "Calle del Mar 18, Alcorcón", "768990011"),
                new clsPersona(79, "Quique", "Vega Gil", new DateTime(1999, 7, 13), "Paseo de Extremadura 33, Parla", "769001122"),
                new clsPersona(80, "Úrsula", "Cruz Ramos", new DateTime(1971, 2, 6), "Av. de España 4, Torrejón de Ardoz", "770112233"),
                new clsPersona(81, "Willy", "Solís Sáez", new DateTime(1985, 10, 2), "Calle Londres 2, Alcobendas", "771223344"),
                new clsPersona(82, "Ximena", "Sáez Vidal", new DateTime(1992, 4, 27), "Av. de la M-40 10, Las Rozas de Madrid", "772334455"),
                new clsPersona(83, "Yago", "Torres Ramos", new DateTime(1976, 1, 19), "Pza. de la Constitución 1, Pozuelo de Alarcón", "773445566"),
                new clsPersona(84, "Maite", "Cano Sanz", new DateTime(1990, 9, 10), "Calle Larga 27, San Sebastián de los Reyes", "774556677"),
                new clsPersona(85, "Borja", "Velasco Rico", new DateTime(1983, 3, 5), "Av. Príncipe de Asturias 6, Majadahonda", "775667788"),
                new clsPersona(86, "Dunia", "Serrano Castro", new DateTime(1997, 11, 24), "Calle del Este 3, Rivas-Vaciamadrid", "776778899"),
                new clsPersona(87, "Enzo", "Prieto Sanz", new DateTime(1975, 8, 1), "Paseo del Parque 11, Valdemoro", "777889900"),
                new clsPersona(88, "Flor", "Muñoz Vega", new DateTime(1994, 6, 20), "Ronda del Tajo 8, Aranjuez", "778990011"),
                new clsPersona(89, "Genaro", "Torres Solís", new DateTime(1989, 12, 14), "Av. del Oeste 5, Colmenar Viejo", "779001122"),
                new clsPersona(90, "Hilda", "Gil Cano", new DateTime(1970, 7, 9), "Calle del Centro 15, Tres Cantos", "780112233"),
                new clsPersona(91, "Íñigo", "Peña Cruz", new DateTime(1985, 4, 1), "Plaza de la Hispanidad 10, Pinto", "781223344"),
                new clsPersona(92, "Jara", "Ríos León", new DateTime(1998, 1, 26), "Av. de la Constitución 22, Boadilla del Monte", "782334455"),
                new clsPersona(93, "Leo", "Cano Vidal", new DateTime(1972, 11, 11), "Calle Ancha 40, San Fernando de Henares", "783445566"),
                new clsPersona(94, "Mina", "Martín Soto", new DateTime(1986, 5, 19), "Paseo del Sol 3, Arganda del Rey", "784556677"),
                new clsPersona(95, "Nico", "Ramos Ruiz", new DateTime(1990, 3, 8), "Ronda de Toledo 9, Villaviciosa de Odón", "785667788"),
                new clsPersona(96, "Oria", "Jiménez Gil", new DateTime(1977, 9, 28), "Av. del Norte 17, Navalcarnero", "786778899"),
                new clsPersona(97, "Paco", "Herrera Gómez", new DateTime(1994, 12, 12), "Calle del Sur 25, Ciempozuelos", "787889900"),
                new clsPersona(98, "Quiela", "Fernández López", new DateTime(1981, 6, 2), "Plaza del Pueblo 8, Mejorada del Campo", "788990011"),
                new clsPersona(99, "Ramiro", "García Navarro", new DateTime(1996, 10, 29), "Paseo del Bosque 1, Algete", "789001122"),
                new clsPersona(100, "Sonia", "Sánchez Ortega", new DateTime(1973, 4, 16), "Av. de la Sierra 13, Aranjuez", "790112233")
            };
        }


    }
}
