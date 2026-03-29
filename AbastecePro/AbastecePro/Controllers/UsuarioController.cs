using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Domain.Interfaces.UseCases;
using System.Threading.Tasks;

namespace AbastecePro.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioUseCase _usuarioUseCase;

        public UsuarioController(IUsuarioUseCase usuarioUseCase)
        {
            _usuarioUseCase = usuarioUseCase;
        }

        /// <summary>
        /// Obtiene todos los usuarios del sistema.
        /// Precondiciones: El sistema debe estar inicializado y el caso de uso disponible.
        /// Postcondiciones: Retorna una lista de todos los usuarios en un resultado Ok.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllUsuarios()
        {
            IActionResult result;
            try
            {
                Usuario[] usuarios = await _usuarioUseCase.GetAllUsuarios();
                result = Ok(usuarios);
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }

        /// <summary>
        /// Obtiene un usuario específico por su identificador único.
        /// Precondiciones: El ID proporcionado debe ser un entero positivo.
        /// Postcondiciones: Retorna el usuario si se encuentra (Ok), de lo contrario retorna NotFound.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsuarioById(int id)
        {
            IActionResult result;
            try
            {
                Usuario usuario = await _usuarioUseCase.GetUsuarioById(id);
                if (usuario == null)
                {
                    result = NotFound();
                }
                else
                {
                    result = Ok(usuario);
                }
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }

        /// <summary>
        /// Agrega un nuevo usuario al sistema.
        /// Precondiciones: El objeto usuario debe ser válido y contener todos los campos requeridos.
        /// Postcondiciones: Retorna Ok si el usuario se agregó correctamente, de lo contrario BadRequest.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> AddUsuario(Usuario usuario)
        {
            IActionResult result;
            try
            {
                bool success = await _usuarioUseCase.AddUsuario(usuario);
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
        /// Actualiza la información de un usuario existente.
        /// Precondiciones: El ID proporcionado debe coincidir con un usuario existente y el objeto usuario debe ser válido.
        /// Postcondiciones: Retorna Ok si la actualización fue exitosa, de lo contrario BadRequest.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUsuario(int id, Usuario usuario)
        {
            IActionResult result;
            try
            {
                bool success = await _usuarioUseCase.UpdateUsuario(id, usuario);
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
        /// Elimina (desactiva) un usuario del sistema.
        /// Precondiciones: El ID proporcionado debe coincidir con un usuario existente.
        /// Postcondiciones: Retorna Ok si la eliminación fue exitosa, de lo contrario BadRequest.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            IActionResult result;
            try
            {
                bool success = await _usuarioUseCase.DeleteUsuario(id);
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
