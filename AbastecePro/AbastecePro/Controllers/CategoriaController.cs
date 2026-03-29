using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Domain.Interfaces.UseCases;
using System.Threading.Tasks;

namespace AbastecePro.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoriaUseCase _categoriaUseCase;

        public CategoriaController(ICategoriaUseCase categoriaUseCase)
        {
            _categoriaUseCase = categoriaUseCase;
        }

        /// <summary>
        /// Obtiene todas las categorías del sistema.
        /// Precondiciones: El sistema debe estar inicializado y el caso de uso disponible.
        /// Postcondiciones: Retorna una lista de todas las categorías en un resultado Ok.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllCategorias()
        {
            IActionResult result;
            try
            {
                Categoria[] categorias = await _categoriaUseCase.GetAllCategorias();
                result = Ok(categorias);
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }

        /// <summary>
        /// Obtiene una categoría específica por su identificador único.
        /// Precondiciones: El ID proporcionado debe ser un entero positivo.
        /// Postcondiciones: Retorna la categoría si se encuentra (Ok), de lo contrario retorna NotFound.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoriaById(int id)
        {
            IActionResult result;
            try
            {
                Categoria categoria = await _categoriaUseCase.GetCategoriaById(id);
                if (categoria == null)
                {
                    result = NotFound();
                }
                else
                {
                    result = Ok(categoria);
                }
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }

        /// <summary>
        /// Agrega una nueva categoría al sistema.
        /// Precondiciones: El objeto categoría debe ser válido y contener todos los campos requeridos.
        /// Postcondiciones: Retorna Ok si la categoría se agregó correctamente, de lo contrario BadRequest.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> AddCategoria(Categoria categoria)
        {
            IActionResult result;
            try
            {
                bool success = await _categoriaUseCase.AddCategoria(categoria);
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
        /// Actualiza la información de una categoría existente.
        /// Precondiciones: El ID proporcionado debe coincidir con una categoría existente y el objeto categoría debe ser válido.
        /// Postcondiciones: Retorna Ok si la actualización fue exitosa, de lo contrario BadRequest.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategoria(int id, Categoria categoria)
        {
            IActionResult result;
            try
            {
                bool success = await _categoriaUseCase.UpdateCategoria(id, categoria);
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
        /// Elimina (desactiva) una categoría del sistema.
        /// Precondiciones: El ID proporcionado debe coincidir con una categoría existente.
        /// Postcondiciones: Retorna Ok si la eliminación fue exitosa, de lo contrario BadRequest.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoria(int id)
        {
            IActionResult result;
            try
            {
                bool success = await _categoriaUseCase.DeleteCategoria(id);
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
