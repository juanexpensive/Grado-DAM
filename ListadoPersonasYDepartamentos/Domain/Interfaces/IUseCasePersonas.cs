using Domain.DTOs;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IUseCasePersonas
    {
        List<PersonaConNombreDeDepartamentoDTO> getListaPersonasConDepartamento();

        List<Persona> getListaPersonas();
        PersonaConNombreDeDepartamentoDTO GetDetallePersona(int id);
        PersonaConListaDeDepartamentosDTO GetPersonaConListaDepartamentos(int id);
        PersonaConListaDeDepartamentosDTO GetPersonaParaCrear();

        int CrearPersona(Persona persona);
        int ActualizarPersona(int id, Persona persona);
        int EliminarPersona(int id);
    }
}
