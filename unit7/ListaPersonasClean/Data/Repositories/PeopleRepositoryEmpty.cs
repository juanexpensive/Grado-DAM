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
           {};
        }


    }
}
