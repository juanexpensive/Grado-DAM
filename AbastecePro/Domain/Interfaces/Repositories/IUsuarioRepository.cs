using Domain.Entities;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    public interface IUsuarioRepository
    {
        Task<Usuario[]> GetAllUsuarios();
        Task<Usuario> GetUsuarioById(int id);
        Task<bool> AddUsuario(Usuario usuario);
        Task<bool> UpdateUsuario(int id, Usuario usuario);
        Task<bool> DeleteUsuario(int id);
    }
}