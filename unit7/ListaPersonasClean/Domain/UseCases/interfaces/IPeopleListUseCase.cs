using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DOMAIN.Entities.CRUDPersonasDomain.Entities;


namespace DOMAIN.UseCases.interfaces
{
    // Esta interfaz es la que deberá implementar el caso de uso
    public interface IPeopleListUseCase
    {
        public List<clsPersona> getPeopleList();
    }
}

