using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IRepositoryDepartamentos
    {
        Departamento[] getListaDepartamentos();

        int crearDepartamento(Departamento departamentoNuevo);

        int actualizarDepartamento(int idDepartamento, Departamento departamento);

        int eliminarDepartamento(int idDepartamento);

        Departamento getDepartamentoById(int idDepartamento);
    }
}
