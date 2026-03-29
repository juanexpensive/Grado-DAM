using Domain.Entities;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    public interface IDireccionRepository
    {
        Task<Direccion[]> GetAllDirecciones();
        Task<Direccion> GetDireccionById(int id);
        Task<bool> AddDireccion(Direccion direccion);
        Task<bool> UpdateDireccion(int id, Direccion direccion);
        Task<bool> DeleteDireccion(int id);
    }
}
