using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Domain.Interfaces.UseCases;
using System.Threading.Tasks;

namespace AbastecePro.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmpresaController : ControllerBase
    {
        private readonly IEmpresaUseCase _empresaUseCase;

        public EmpresaController(IEmpresaUseCase empresaUseCase)
        {
            _empresaUseCase = empresaUseCase;
        }

        /// <summary>
        /// Obtiene todas las empresas del sistema.
        /// Precondiciones: El sistema debe estar inicializado y el caso de uso disponible.
        /// Postcondiciones: Retorna una lista de todas las empresas en un resultado Ok.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetEmpresa()
        {
            IActionResult result;
            try
            {
                Empresa[] empresas = await _empresaUseCase.GetAllEmpresas();
                result = Ok(empresas);
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }


        /// <summary>
        /// Obtiene una empresa específica por su identificador único.
        /// Precondiciones: El ID proporcionado debe ser un entero positivo.
        /// Postcondiciones: Retorna la empresa si se encuentra (Ok), de lo contrario retorna NotFound.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmpresaById(int id)
        {
            IActionResult result;
            try
            {
                Empresa empresa = await _empresaUseCase.GetEmpresaById(id);
                if (empresa == null)
                {
                    result = NotFound();
                }
                else
                {
                    result = Ok(empresa);
                }
            }
            catch (System.Exception ex)
            {
                result = Problem(ex.Message);
            }
            return result;
        }

        /// <summary>
        /// Agrega una nueva empresa al sistema.
        /// Precondiciones: El objeto empresa debe ser válido y contener todos los campos requeridos.
        /// Postcondiciones: Retorna Ok si la empresa se agregó correctamente, de lo contrario BadRequest.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> AddEmpresa(Empresa empresa)
        {
            IActionResult result;
            try
            {
                bool success = await _empresaUseCase.AddEmpresa(empresa);
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
        /// Actualiza la información de una empresa existente.
        /// Precondiciones: El ID proporcionado debe coincidir con una empresa existente y el objeto empresa debe ser válido.
        /// Postcondiciones: Retorna Ok si la actualización fue exitosa, de lo contrario BadRequest.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmpresa(int id, Empresa empresa)
        {
            IActionResult result;
            try
            {
                bool success = await _empresaUseCase.UpdateEmpresa(id, empresa);
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
        /// Elimina (desactiva) una empresa del sistema.
        /// Precondiciones: El ID proporcionado debe coincidir con una empresa existente.
        /// Postcondiciones: Retorna Ok si la eliminación fue exitosa, de lo contrario BadRequest.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmpresa(int id)
        {
            IActionResult result;
            try
            {
                bool success = await _empresaUseCase.DeleteEmpresa(id);
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
