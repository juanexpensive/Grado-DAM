using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IUseCaseDepartamentos
    {
        List<Departamento> GetDepartamentos();
        Departamento GetDetalleDepartamento(int id);
        Departamento GetDepartamentoParaEditar(int id);
        List<Persona> GetPersonasPorDepartamento(int id);
        void CrearDepartamento(Departamento departamento);
        void ActualizarDepartamento(Departamento departamento);
        void EliminarDepartamento(int id);
    }
}
