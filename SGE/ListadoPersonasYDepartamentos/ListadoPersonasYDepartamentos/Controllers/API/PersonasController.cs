using Domain.Entities;
using Domain.Interfaces;
using Domain.UseCases;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UI.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonasController : ControllerBase
    {
        private readonly IUseCasePersonas _useCasePersonas;
        public PersonasController(IUseCasePersonas useCasePersonas)
        {
            _useCasePersonas = useCasePersonas;
        }

        // GET: api/<PersonasController>
        [HttpGet]
        public IActionResult Get()
        {
            IActionResult salida;
            List<Persona> listadoCompleto = new List<Persona>();
            try
            {
                listadoCompleto = _useCasePersonas.getListaPersonas();
                if (listadoCompleto.Count == 0)
                {
                    salida = NoContent();
                }
                else
                {
                    salida = Ok(listadoCompleto);
                }
            }
            catch
            {
                salida = BadRequest();
            }
            return salida;
        }

        // GET api/<PersonasController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var persona = _useCasePersonas.GetDetallePersona(id);

                if (persona == null)
                {
                    return NotFound(new { mensaje = $"No se encontró la persona con id {id}" });
                }

                return Ok(persona);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al obtener la persona", error = ex.Message });
            }
        }

        // POST api/<PersonasController>
        [HttpPost]
        public IActionResult Post([FromBody] Persona persona)
        {
            try
            {
                if (persona == null)
                {
                    return BadRequest(new { mensaje = "Los datos de la persona son requeridos" });
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                int resultado = _useCasePersonas.CrearPersona(persona);

                if (resultado > 0)
                {
                    return CreatedAtAction(nameof(Get), new { id = resultado }, persona);
                }

                return BadRequest(new { mensaje = "No se pudo crear la persona" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al crear la persona", error = ex.Message });
            }
        }

        // PUT api/<PersonasController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Persona persona)
        {
            try
            {
                if (persona == null)
                {
                    return BadRequest(new { mensaje = "Los datos de la persona son requeridos" });
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                int numFilasAfectadas = _useCasePersonas.ActualizarPersona(id, persona);

                if (numFilasAfectadas == 0)
                {
                    return NotFound(new { mensaje = $"No se encontró la persona con id {id}" });
                }

                return Ok(new { mensaje = "Persona actualizada correctamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al actualizar la persona", error = ex.Message });
            }
        }

        // DELETE api/<PersonasController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            IActionResult salida;
            int numFilasAfectadas = 0;


            try
            {

                numFilasAfectadas = _useCasePersonas.EliminarPersona(id);
                if (numFilasAfectadas == 0)
                {
                    salida = NotFound();
                }
                else
                {
                    salida = Ok();
                }
            }
            catch (Exception e)
            {
                salida = BadRequest();
            }

            return salida;
        }

    }
}
