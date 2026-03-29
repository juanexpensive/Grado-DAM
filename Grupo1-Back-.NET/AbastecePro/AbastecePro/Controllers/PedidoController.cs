using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Domain.Interfaces.UseCases;
using System.Threading.Tasks;

namespace AbastecePro.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedidoController : ControllerBase
    {
        private readonly IPedidoUseCase _pedidoUseCase;

        public PedidoController(IPedidoUseCase pedidoUseCase)
        {
            _pedidoUseCase = pedidoUseCase;
        }

        /// <summary>
        /// Obtiene todos los pedidos del sistema.
        /// Precondiciones: El sistema debe estar inicializado y el caso de uso disponible.
        /// Postcondiciones: Retorna una lista de todos los pedidos en un resultado Ok.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllPedidos()
        {
            IActionResult result;
            try
            {
                Pedido[] pedidos = await _pedidoUseCase.GetAllPedidos();
                result = Ok(pedidos);
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }

        /// <summary>
        /// Obtiene un pedido específico por su identificador único.
        /// Precondiciones: El ID proporcionado debe ser un entero positivo.
        /// Postcondiciones: Retorna el pedido si se encuentra (Ok), de lo contrario retorna NotFound.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPedidoById(int id)
        {
            IActionResult result;
            try
            {
                Pedido pedido = await _pedidoUseCase.GetPedidoById(id);
                if (pedido == null)
                {
                    result = NotFound();
                }
                else
                {
                    result = Ok(pedido);
                }
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }

        /// <summary>
        /// Agrega un nuevo pedido al sistema.
        /// Precondiciones: El objeto pedido debe ser válido y contener todos los campos requeridos.
        /// Postcondiciones: Retorna Ok si el pedido se agregó correctamente, de lo contrario BadRequest.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> AddPedido(Pedido pedido)
        {
            IActionResult result;
            try
            {
                bool success = await _pedidoUseCase.AddPedido(pedido);
                if (success)
                {
                    result = CreatedAtAction(nameof(GetPedidoById), new { id = pedido.Id }, pedido);
                }
                else
                {
                    result = BadRequest();
                }
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }

        /// <summary>
        /// Actualiza la información de un pedido existente.
        /// Precondiciones: El ID proporcionado debe coincidir con un pedido existente y el objeto pedido debe ser válido.
        /// Postcondiciones: Retorna Ok si la actualización fue exitosa, de lo contrario BadRequest.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePedido(int id, Pedido pedido)
        {
            IActionResult result;
            try
            {
                bool success = await _pedidoUseCase.UpdatePedido(id, pedido);
                if (success)
                {
                    pedido.Id = id;
                    result = Ok(pedido);
                }
                else
                {
                    result = BadRequest();
                }
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }

        /// <summary>
        /// Elimina (desactiva) un pedido del sistema.
        /// Precondiciones: El ID proporcionado debe coincidir con un pedido existente.
        /// Postcondiciones: Retorna Ok si la eliminación fue exitosa, de lo contrario BadRequest.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePedido(int id)
        {
            IActionResult result;
            try
            {
                bool success = await _pedidoUseCase.DeletePedido(id);
                if (success)
                {
                    result = Ok();
                }
                else
                {
                    result = BadRequest();
                }
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }
    }
}
