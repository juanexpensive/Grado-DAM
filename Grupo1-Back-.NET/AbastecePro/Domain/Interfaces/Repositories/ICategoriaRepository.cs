using Domain.Entities;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    public interface ICategoriaRepository
    {
        Task<Categoria[]> GetAllCategorias();
        Task<Categoria> GetCategoriaById(int id);
        Task<bool> AddCategoria(Categoria categoria);
        Task<bool> UpdateCategoria(int id, Categoria categoria);
        Task<bool> DeleteCategoria(int id);
    }
}
