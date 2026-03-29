using Domain.Entities;
using System.Threading.Tasks;

namespace Domain.Interfaces.UseCases
{
    public interface IDetallePedidoUseCase
    {
        Task<DetallePedido[]> GetAllDetallesPedido();
        Task<DetallePedido> GetDetallePedidoById(int id);
        Task<bool> AddDetallePedido(DetallePedido detallePedido);
        Task<bool> UpdateDetallePedido(int id, DetallePedido detallePedido);
        Task<bool> DeleteDetallePedido(int id);
    }
}
