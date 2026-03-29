using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentosController : ControllerBase
    {
        private readonly IUseCaseDepartamentos _useCaseDepartamentos;

        public DepartamentosController(IUseCaseDepartamentos useCaseDepartamentos)
        {
            _useCaseDepartamentos = useCaseDepartamentos;
        }

        // GET: api/Departamentos
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var listadoCompleto = _useCaseDepartamentos.GetDepartamentos();

                if (listadoCompleto == null || listadoCompleto.Count == 0)
                {
                    return NoContent();
                }

                return Ok(listadoCompleto);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al obtener los departamentos", error = ex.Message });
            }
        }

        // GET: api/Departamentos/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var departamento = _useCaseDepartamentos.GetDetalleDepartamento(id);

                if (departamento == null)
                {
                    return NotFound(new { mensaje = $"No se encontró el departamento con id {id}" });
                }

                return Ok(departamento);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al obtener el departamento", error = ex.Message });
            }
        }

        // GET: api/Departamentos/5/personas
        [HttpGet("{id}/personas")]
        public IActionResult GetPersonas(int id)
        {
            try
            {
                var personas = _useCaseDepartamentos.GetPersonasPorDepartamento(id);

                if (personas == null || personas.Count == 0)
                {
                    return NoContent();
                }

                return Ok(personas);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al obtener las personas del departamento", error = ex.Message });
            }
        }
        
        // POST: api/Departamentos
        [HttpPost]
        public IActionResult Post([FromBody] Departamento departamento)
        {
            try
            {
                if (departamento == null)
                {
                    return BadRequest(new { mensaje = "Los datos del departamento son requeridos" });
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _useCaseDepartamentos.CrearDepartamento(departamento);

                return CreatedAtAction(nameof(Get), new { id = departamento.id }, departamento);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al crear el departamento", error = ex.Message });
            }
        }

        // PUT: api/Departamentos/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Departamento departamento)
        {
            try
            {
                if (departamento == null)
                {
                    return BadRequest(new { mensaje = "Los datos del departamento son requeridos" });
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Verificar que el departamento existe antes de actualizar
                var departamentoExistente = _useCaseDepartamentos.GetDetalleDepartamento(id);
                if (departamentoExistente == null)
                {
                    return NotFound(new { mensaje = $"No se encontró el departamento con id {id}" });
                }

                // Asegurar que el id del departamento coincida con el id de la ruta
                departamento.id = id;

                _useCaseDepartamentos.ActualizarDepartamento(departamento);

                return Ok(new { mensaje = "Departamento actualizado correctamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al actualizar el departamento", error = ex.Message });
            }
        }

        // DELETE: api/Departamentos/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                // Verificar que el departamento existe antes de eliminar
                var departamento = _useCaseDepartamentos.GetDetalleDepartamento(id);
                if (departamento == null)
                {
                    return NotFound(new { mensaje = $"No se encontró el departamento con id {id}" });
                }

                // Verificar si hay personas asociadas al departamento
                var personas = _useCaseDepartamentos.GetPersonasPorDepartamento(id);
                if (personas != null && personas.Count > 0)
                {
                    return Conflict(new
                    {
                        mensaje = "No se puede eliminar el departamento porque tiene personas asociadas",
                        cantidadPersonas = personas.Count
                    });
                }

                _useCaseDepartamentos.EliminarDepartamento(id);

                return Ok(new { mensaje = "Departamento eliminado correctamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al eliminar el departamento", error = ex.Message });
            }
        }
    }
}