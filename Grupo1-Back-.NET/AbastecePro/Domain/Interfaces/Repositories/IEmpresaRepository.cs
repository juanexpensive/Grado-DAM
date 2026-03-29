using Domain.Entities;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    public interface IEmpresaRepository
    {
        Task<Empresa[]> GetAllEmpresas();
        Task<Empresa> GetEmpresaById(int id);
        Task<bool> AddEmpresa(Empresa empresa);
        Task<bool> UpdateEmpresa(int id, Empresa empresa);
        Task<bool> DeleteEmpresa(int id);
    }
}
