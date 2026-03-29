using Domain.Entities;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.UseCases;
using System.Threading.Tasks;

namespace Domain.UseCases
{
    public class DetallePedidoUseCase : IDetallePedidoUseCase
    {
        private readonly IDetallePedidoRepository _detallePedidoRepository;

        public DetallePedidoUseCase(IDetallePedidoRepository detallePedidoRepository)
        {
            _detallePedidoRepository = detallePedidoRepository;
        }

        public Task<DetallePedido[]> GetAllDetallesPedido()
        {
            return _detallePedidoRepository.GetAllDetallesPedido();
        }

        public Task<DetallePedido> GetDetallePedidoById(int id)
        {
            return _detallePedidoRepository.GetDetallePedidoById(id);
        }

        public Task<bool> AddDetallePedido(DetallePedido detallePedido)
        {
            return _detallePedidoRepository.AddDetallePedido(detallePedido);
        }

        public Task<bool> UpdateDetallePedido(int id, DetallePedido detallePedido)
        {
            return _detallePedidoRepository.UpdateDetallePedido(id, detallePedido);
        }

        public Task<bool> DeleteDetallePedido(int id)
        {
            return _detallePedidoRepository.DeleteDetallePedido(id);
        }
    }
}
