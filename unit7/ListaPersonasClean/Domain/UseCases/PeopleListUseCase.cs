using DOMAIN.Entities.CRUDPersonasDomain.Entities;
using DOMAIN.UseCases.interfaces;


namespace DOMAIN.UseCases
{

    public class PeopleListUseCase : IPeopleListUseCase
    {
        private readonly IPeopleRepository _peopleListRepository;

        //Inyectamos en el constructor el repositorio
        public PeopleListUseCase(IPeopleRepository peopleRepository)
        {
            _peopleListRepository = peopleRepository;
        }

        /// <summary>
        /// Función que devuelve un listado completo de personas aplicando las reglas de negocio necesarias
        /// </summary>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public List<clsPersona> getPeopleList()
        {
            //Aquí se aplicacarian las reglas de negocio necesarias
            return _peopleListRepository.getPeopleListRep();
        }
    }
}
