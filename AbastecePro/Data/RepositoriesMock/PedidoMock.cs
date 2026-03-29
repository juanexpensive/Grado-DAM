using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces.Repositories;
using Domain.Utils;

namespace Data.RepositoriesMock
{
    public class PedidoMock : IPedidoRepository
    {
        private static readonly List<Pedido> _pedidos = new List<Pedido>
        {
            new Pedido(DateTime.Now, 1, 1, 1, 100.50m, "Pendiente") { Id = 1 },
            new Pedido(DateTime.Now.AddDays(-1), 1, 1, 1, 50.00m, "Enviado") { Id = 2 }
        };

        public Task<bool> AddPedido(Pedido pedido)
        {
            pedido.Id = _pedidos.Count > 0 ? _pedidos.Max(p => p.Id) + 1 : 1;
            _pedidos.Add(pedido);
            return Task.FromResult(true);
        }

        public Task<Pedido[]> GetAllPedidos()
        {
            return Task.FromResult(_pedidos.ToArray());
        }

        public Task<Pedido> GetPedidoById(int id)
        {
            return Task.FromResult(_pedidos.FirstOrDefault(p => p.Id == id));
        }

        public Task<bool> UpdatePedido(int id, Pedido pedido)
        {
            var existingPedido = _pedidos.FirstOrDefault(p => p.Id == id);
            if (existingPedido != null)
            {
                existingPedido.Fecha = pedido.Fecha;
                existingPedido.IdUsuario = pedido.IdUsuario;
                existingPedido.IdEmpresaProveedora = pedido.IdEmpresaProveedora;
                existingPedido.IdEmpresaConsumidora = pedido.IdEmpresaConsumidora;
                existingPedido.PrecioTotal = pedido.PrecioTotal;
                existingPedido.Estado = pedido.Estado;
                existingPedido.Activo = pedido.Activo;
                return Task.FromResult(true);
            }
            return Task.FromResult(false);
        }

        public Task<bool> DeletePedido(int id)
        {
            var existingPedido = _pedidos.FirstOrDefault(p => p.Id == id);
            if (existingPedido != null)
            {
                existingPedido.Activo = false;
                return Task.FromResult(true);
            }
            return Task.FromResult(false);
        }
    }
}
