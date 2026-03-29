using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Domain.Interfaces.UseCases;
using System.Threading.Tasks;

namespace AbastecePro.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DetallePedidoController : ControllerBase
    {
        private readonly IDetallePedidoUseCase _detallePedidoUseCase;

        public DetallePedidoController(IDetallePedidoUseCase detallePedidoUseCase)
        {
            _detallePedidoUseCase = detallePedidoUseCase;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDetallesPedido()
        {
            IActionResult result;
            try
            {
                DetallePedido[] detalles = await _detallePedidoUseCase.GetAllDetallesPedido();
                result = Ok(detalles);
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetallePedidoById(int id)
        {
            IActionResult result;
            try
            {
                DetallePedido detalle = await _detallePedidoUseCase.GetDetallePedidoById(id);
                if (detalle == null)
                {
                    result = NotFound();
                }
                else
                {
                    result = Ok(detalle);
                }
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }

        [HttpPost]
        public async Task<IActionResult> AddDetallePedido(DetallePedido detallePedido)
        {
            IActionResult result;
            try
            {
                bool success = await _detallePedidoUseCase.AddDetallePedido(detallePedido);
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDetallePedido(int id, DetallePedido detallePedido)
        {
            IActionResult result;
            try
            {
                bool success = await _detallePedidoUseCase.UpdateDetallePedido(id, detallePedido);
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetallePedido(int id)
        {
            IActionResult result;
            try
            {
                bool success = await _detallePedidoUseCase.DeleteDetallePedido(id);
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
