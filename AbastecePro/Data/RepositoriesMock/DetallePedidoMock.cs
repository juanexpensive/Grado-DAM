using Domain.Entities;
using Domain.Interfaces.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Data.RepositoriesMock
{
    public class DetallePedidoMock : IDetallePedidoRepository
    {
        private static readonly List<DetallePedido> _detallesPedido = new List<DetallePedido>
        {
            new DetallePedido(1, 1, 3, 5.50m) { Id = 1 },
            new DetallePedido(1, 2, 1, 12.00m) { Id = 2 },
            new DetallePedido(2, 3, 2, 8.75m) { Id = 3 },
            new DetallePedido(2, 1, 5, 5.50m) { Id = 4 }
        };

        public Task<bool> AddDetallePedido(DetallePedido detallePedido)
        {
            detallePedido.Id = _detallesPedido.Count > 0 ? _detallesPedido.Max(d => d.Id) + 1 : 1;
            _detallesPedido.Add(detallePedido);
            return Task.FromResult(true);
        }

        public Task<bool> DeleteDetallePedido(int id)
        {
            var detalle = _detallesPedido.FirstOrDefault(d => d.Id == id);
            if (detalle != null)
            {
                _detallesPedido.Remove(detalle);
                return Task.FromResult(true);
            }
            return Task.FromResult(false);
        }

        public Task<DetallePedido[]> GetAllDetallesPedido()
        {
            return Task.FromResult(_detallesPedido.ToArray());
        }

        public Task<DetallePedido> GetDetallePedidoById(int id)
        {
            return Task.FromResult(_detallesPedido.FirstOrDefault(d => d.Id == id));
        }

        public Task<bool> UpdateDetallePedido(int id, DetallePedido detallePedido)
        {
            var existingDetalle = _detallesPedido.FirstOrDefault(d => d.Id == id);
            if (existingDetalle != null)
            {
                existingDetalle.IdPedido = detallePedido.IdPedido;
                existingDetalle.IdProducto = detallePedido.IdProducto;
                existingDetalle.CantidadProducto = detallePedido.CantidadProducto;
                existingDetalle.PrecioUnitario = detallePedido.PrecioUnitario;
                return Task.FromResult(true);
            }
            return Task.FromResult(false);
        }
    }
}
