using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Domain.Interfaces.UseCases;
using System.Threading.Tasks;

namespace AbastecePro.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductoController : ControllerBase
    {
        private readonly IProductoUseCase _productoUseCase;

        public ProductoController(IProductoUseCase productoUseCase)
        {
            _productoUseCase = productoUseCase;
        }

        /// <summary>
        /// Obtiene todos los productos del sistema.
        /// Precondiciones: El sistema debe estar inicializado y el caso de uso disponible.
        /// Postcondiciones: Retorna una lista de todos los productos en un resultado Ok.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllProductos()
        {
            IActionResult result;
            try
            {
                Producto[] productos = await _productoUseCase.GetAllProductos();
                result = Ok(productos);
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }

        /// <summary>
        /// Obtiene un producto específico por su identificador único.
        /// Precondiciones: El ID proporcionado debe ser un entero positivo.
        /// Postcondiciones: Retorna el producto si se encuentra (Ok), de lo contrario retorna NotFound.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductoById(int id)
        {
            IActionResult result;
            try
            {
                Producto producto = await _productoUseCase.GetProductoById(id);
                if (producto == null)
                {
                    result = NotFound();
                }
                else
                {
                    result = Ok(producto);
                }
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }

        /// <summary>
        /// Agrega un nuevo producto al sistema.
        /// Precondiciones: El objeto producto debe ser válido y contener todos los campos requeridos.
        /// Postcondiciones: Retorna Ok si el producto se agregó correctamente, de lo contrario BadRequest.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> AddProducto(Producto producto)
        {
            IActionResult result;
            try
            {
                bool success = await _productoUseCase.AddProducto(producto);
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

        /// <summary>
        /// Actualiza la información de un producto existente.
        /// Precondiciones: El ID proporcionado debe coincidir con un producto existente y el objeto producto debe ser válido.
        /// Postcondiciones: Retorna Ok si la actualización fue exitosa, de lo contrario BadRequest.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProducto(int id, Producto producto)
        {
            IActionResult result;
            try
            {
                bool success = await _productoUseCase.UpdateProducto(id, producto);
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

        /// <summary>
        /// Elimina (desactiva) un producto del sistema.
        /// Precondiciones: El ID proporcionado debe coincidir con un producto existente.
        /// Postcondiciones: Retorna Ok si la eliminación fue exitosa, de lo contrario BadRequest.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducto(int id)
        {
            IActionResult result;
            try
            {
                bool success = await _productoUseCase.DeleteProducto(id);
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
