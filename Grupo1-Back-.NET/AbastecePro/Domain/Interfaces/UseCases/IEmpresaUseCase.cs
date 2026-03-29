using Domain.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Domain.Interfaces.UseCases
{
    public interface IEmpresaUseCase
    {
        Task<Empresa[]> GetAllEmpresas();
        Task<Empresa> GetEmpresaById(int id);
        Task<bool> AddEmpresa(Empresa empresa);
        Task<bool> UpdateEmpresa(int id, Empresa empresa);
        Task<bool> DeleteEmpresa(int id);
    }
}
