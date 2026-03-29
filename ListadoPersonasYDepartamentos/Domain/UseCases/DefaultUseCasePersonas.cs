using Domain.DTOs;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Domain.UseCases
{
    public class DefaultUseCasePersonas : IUseCasePersonas
    {
        private readonly IRepositoryPersonas _repositoryPersonas;
        private readonly IRepositoryDepartamentos _repositoryDepartamentos;

        public DefaultUseCasePersonas(IRepositoryPersonas repositoryPersonas, IRepositoryDepartamentos repositoryDepartamentos)
        {
            _repositoryPersonas = repositoryPersonas;
            _repositoryDepartamentos = repositoryDepartamentos;
        }

        public List<PersonaConNombreDeDepartamentoDTO> getListaPersonasConDepartamento()
        {
            String nombreDepartamento = "";
            List<PersonaConNombreDeDepartamentoDTO> listaPersonasConNombreDepartamento = new List<PersonaConNombreDeDepartamentoDTO>();
            List<Departamento> listaDepartamentos = _repositoryDepartamentos.getListaDepartamentos().ToList();

            foreach (Persona persona in _repositoryPersonas.getListaPersonas())
            {
                nombreDepartamento = listaDepartamentos
                    .Where(departamento => departamento.id == persona.idDepartamento)
                    .First().nombre;

                listaPersonasConNombreDepartamento.Add(
                    new PersonaConNombreDeDepartamentoDTO(
                        persona.id,
                        persona.nombre,
                        persona.apellido,
                        persona.direccion,
                        persona.telefono,
                        persona.fechaNac,
                        persona.imagen,
                        nombreDepartamento
                    )
                );
            }

            return listaPersonasConNombreDepartamento;
        }

        public PersonaConNombreDeDepartamentoDTO GetDetallePersona(int id)
        {
            Persona persona = _repositoryPersonas.getPersonaById(id);

            if (persona == null)
                return null;

            Departamento departamento = _repositoryDepartamentos.getDepartamentoById(persona.idDepartamento);

            return new PersonaConNombreDeDepartamentoDTO(
                persona.id,
                persona.nombre,
                persona.apellido,
                persona.direccion,
                persona.telefono,
                persona.fechaNac,
                persona.imagen,
                departamento.nombre
            );
        }

        public PersonaConListaDeDepartamentosDTO GetPersonaConListaDepartamentos(int id)
        {
            Persona persona = _repositoryPersonas.getPersonaById(id);
            List<Departamento> departamentos = _repositoryDepartamentos.getListaDepartamentos().ToList();

            return new PersonaConListaDeDepartamentosDTO(persona, departamentos);
        }

        public PersonaConListaDeDepartamentosDTO GetPersonaParaCrear()
        {
            Persona personaVacia = new Persona();
            List<Departamento> departamentos = _repositoryDepartamentos.getListaDepartamentos().ToList();

            return new PersonaConListaDeDepartamentosDTO(personaVacia, departamentos);
        }



        public int CrearPersona(Persona persona)
        {
            return _repositoryPersonas.crearPersona(persona);
        }

        public int ActualizarPersona(int id, Persona persona)
        {
            return _repositoryPersonas.actualizarPersona(id, persona);
        }

        public int EliminarPersona(int id)
        {
            return _repositoryPersonas.eliminarPersona(id);
        }

        public List<Persona> getListaPersonas()
        {
            return _repositoryPersonas.getListaPersonas().ToList();
        }
    }
}
