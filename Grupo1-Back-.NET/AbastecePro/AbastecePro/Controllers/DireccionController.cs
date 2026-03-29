using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Domain.Interfaces.UseCases;
using System.Threading.Tasks;

namespace AbastecePro.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DireccionController : ControllerBase
    {
        private readonly IDireccionUseCase _direccionUseCase;

        public DireccionController(IDireccionUseCase direccionUseCase)
        {
            _direccionUseCase = direccionUseCase;
        }

        [HttpGet]   
        public async Task<IActionResult> GetAllDirecciones()
        {
            IActionResult result;
            try
            {
                Direccion[] direcciones = await _direccionUseCase.GetAllDirecciones();
                result = Ok(direcciones);
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDireccionById(int id)
        {
            IActionResult result;
            try
            {
                Direccion direccion = await _direccionUseCase.GetDireccionById(id);
                if (direccion == null)
                {
                    result = NotFound();
                }
                else
                {
                    result = Ok(direccion);
                }
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }

        [HttpPost]
        public async Task<IActionResult> AddDireccion(Direccion direccion)
        {
            IActionResult result;
            try
            {
                bool success = await _direccionUseCase.AddDireccion(direccion);
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
        public async Task<IActionResult> UpdateDireccion(int id, Direccion direccion)
        {
            IActionResult result;
            try
            {
                bool success = await _direccionUseCase.UpdateDireccion(id, direccion);
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
        public async Task<IActionResult> DeleteDireccion(int id)
        {
            IActionResult result;
            try
            {
                bool success = await _direccionUseCase.DeleteDireccion(id);
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
