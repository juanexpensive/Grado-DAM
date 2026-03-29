using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IRepositoryPersonas
    {
        Persona[] getListaPersonas();

        int crearPersona(Persona personaNueva);

        int actualizarPersona(int idPersona, Persona persona);

        int eliminarPersona(int idPersona);

        Persona getPersonaById(int idPersona);

        int contarPersonadepartamento(int idDepartamento);


    }
}
