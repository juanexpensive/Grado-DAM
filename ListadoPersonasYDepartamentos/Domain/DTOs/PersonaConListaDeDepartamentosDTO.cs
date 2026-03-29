using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/// <summary>
/// DTO para editar/crear una persona, incluye la lista de departamentos disponibles
/// </summary>
namespace Domain.DTOs
{
    public class PersonaConListaDeDepartamentosDTO
    {
        public Persona Persona { get; set; }
        public List<Departamento> Departamentos { get; }

        public PersonaConListaDeDepartamentosDTO(Persona persona, List<Departamento> departamentos)
        {
            Persona = persona;
            Departamentos = departamentos;
        }
    }
}
