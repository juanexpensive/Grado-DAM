using Domain.Entities;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.UseCases;
using System.Threading.Tasks;

namespace Domain.UseCases
{
    public class PedidoUseCase : IPedidoUseCase
    {
        private readonly IPedidoRepository _pedidoRepository;

        public PedidoUseCase(IPedidoRepository pedidoRepository)
        {
            _pedidoRepository = pedidoRepository;
        }

        /// <summary>
        /// Obtiene todos los pedidos a través del repositorio.
        /// Precondiciones: El repositorio debe estar inyectado.
        /// Postcondiciones: Retorna una tarea con el arreglo de pedidos.
        /// </summary>
        public Task<Pedido[]> GetAllPedidos()
        {
            return _pedidoRepository.GetAllPedidos();
        }

        /// <summary>
        /// Obtiene un pedido por su ID llamando al repositorio.
        /// Precondiciones: El ID debe ser válido.
        /// Postcondiciones: Retorna una tarea con el pedido encontrado o null.
        /// </summary>
        public Task<Pedido> GetPedidoById(int id)
        {
            return _pedidoRepository.GetPedidoById(id);
        }

        /// <summary>
        /// Registra un nuevo pedido a través del repositorio.
        /// Precondiciones: El objeto pedido debe ser válido.
        /// Postcondiciones: Retorna una tarea con el resultado booleano de la operación.
        /// </summary>
        public Task<bool> AddPedido(Pedido pedido)
        {
            return _pedidoRepository.AddPedido(pedido);
        }

        /// <summary>
        /// Actualiza un pedido existente llamando al repositorio.
        /// Precondiciones: El ID debe existir y el pedido ser válido.
        /// Postcondiciones: Retorna una tarea con el resultado booleano de la actualización.
        /// </summary>
        public Task<bool> UpdatePedido(int id, Pedido pedido)
        {
            return _pedidoRepository.UpdatePedido(id, pedido);
        }

        /// <summary>
        /// Elimina un pedido por su ID llamando al repositorio.
        /// Precondiciones: El ID debe existir.
        /// Postcondiciones: Retorna una tarea con el resultado booleano de la eliminación.
        /// </summary>
        public Task<bool> DeletePedido(int id)
        {
            return _pedidoRepository.DeletePedido(id);
        }
    }
}
