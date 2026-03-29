using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IListadoPersonasRepository
    {
        List<Entities.Persona> obtenerListadoPersonas();
    }
}