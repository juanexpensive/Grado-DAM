using Domain.Entities;
using System.Threading.Tasks;

namespace Domain.Interfaces.UseCases
{
    public interface IUsuarioUseCase
    {
        Task<Usuario[]> GetAllUsuarios();
        Task<Usuario> GetUsuarioById(int id);
        Task<bool> AddUsuario(Usuario usuario);
        Task<bool> UpdateUsuario(int id, Usuario usuario);
        Task<bool> DeleteUsuario(int id);
    }
}
