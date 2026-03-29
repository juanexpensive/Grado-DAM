using Domain.Entities;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    public interface IPedidoRepository
    {
        Task<Pedido[]> GetAllPedidos();
        Task<Pedido> GetPedidoById(int id);
        Task<bool> AddPedido(Pedido pedido);
        Task<bool> UpdatePedido(int id, Pedido pedido);
        Task<bool> DeletePedido(int id);
    }
}
