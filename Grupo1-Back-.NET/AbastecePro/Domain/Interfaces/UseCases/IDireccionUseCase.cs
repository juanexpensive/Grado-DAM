using Domain.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Domain.Interfaces.UseCases
{
    public interface IDireccionUseCase
    {
        Task<Direccion[]> GetAllDirecciones();
        Task<Direccion> GetDireccionById(int id);
        Task<bool> AddDireccion(Direccion direccion);
        Task<bool> UpdateDireccion(int id, Direccion direccion);
        Task<bool> DeleteDireccion(int id);
    }
}
