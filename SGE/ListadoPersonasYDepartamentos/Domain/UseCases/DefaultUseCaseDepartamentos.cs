using Domain.Entities;
using Domain.Interfaces;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.UseCases
{
    public class DefaultUseCaseDepartamentos : IUseCaseDepartamentos
    {
        private readonly IRepositoryDepartamentos _repositoryDepartamentos;
        private readonly IRepositoryPersonas _repositoryPersonas;

        public DefaultUseCaseDepartamentos(IRepositoryDepartamentos repositoryDepartamentos, IRepositoryPersonas repositoryPersonas)
        {
            _repositoryDepartamentos = repositoryDepartamentos;
            _repositoryPersonas = repositoryPersonas;
        }

        public List<Departamento> GetDepartamentos()
        {
            return _repositoryDepartamentos.getListaDepartamentos().ToList();
        }

        public Departamento GetDetalleDepartamento(int id)
        {
            return _repositoryDepartamentos.getDepartamentoById(id);
        }

        public Departamento GetDepartamentoParaEditar(int id)
        {
            return _repositoryDepartamentos.getDepartamentoById(id);
        }

        public List<Persona> GetPersonasPorDepartamento(int id)
        {
            return _repositoryPersonas.getListaPersonas()
                .Where(p => p.idDepartamento == id)
                .ToList();
        }

        public void CrearDepartamento(Departamento departamento)
        {
            _repositoryDepartamentos.crearDepartamento(departamento);
        }

        public void ActualizarDepartamento(Departamento departamento)
        {
            _repositoryDepartamentos.actualizarDepartamento(departamento.id, departamento);
        }

        public void EliminarDepartamento(int id)
        {
            // Verificar si hay personas en este departamento
            int cantidadPersonas = _repositoryPersonas.contarPersonadepartamento(id);

            if (cantidadPersonas > 0)
            {
                throw new InvalidOperationException(
                    $"No se puede eliminar el departamento porque tiene {cantidadPersonas} persona(s) asignada(s)."
                );
            }

            _repositoryDepartamentos.eliminarDepartamento(id);
        }
    }
}
