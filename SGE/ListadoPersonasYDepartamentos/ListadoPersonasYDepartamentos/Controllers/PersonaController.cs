using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers
{
    public class PersonaController : Controller
    {
        private readonly IUseCasePersonas _useCase;

        public PersonaController(IUseCasePersonas useCase)
        {
            _useCase = useCase;
        }

        // GET: PersonaController
        public ActionResult Index()
        {
            return View(_useCase.getListaPersonasConDepartamento());
        }

        // GET: PersonaController/Details/5
        public ActionResult Details(int id)
        {
            var persona = _useCase.GetDetallePersona(id);
            if (persona == null)
            {
                return NotFound();
            }
            return View(persona);
        }

        // GET: PersonaController/Create
        public ActionResult Create()
        {
            var personaConDepartamentos = _useCase.GetPersonaParaCrear();
            return View(personaConDepartamentos);
        }

        // POST: PersonaController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Persona persona)
        {
            // 1. Validar el modelo para capturar errores de Model Binding o Data Annotations
            if (!ModelState.IsValid)
            {
                var dto = _useCase.GetPersonaParaCrear();
                dto.Persona = persona; // Preserva el input del usuario en el DTO
                return View(dto);
            }

            try
            {
                // 2. Guardar la persona y verificar si la operación fue exitosa (debe devolver > 0)
                int rowsAffected = _useCase.CrearPersona(persona);

                if (rowsAffected > 0)
                {
                    // Éxito: Redirige a la lista
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    // Falló la inserción sin lanzar excepción (por ejemplo, lógica interna del Use Case)
                    throw new Exception("La base de datos no pudo crear la persona.");
                }
            }
            catch (Exception ex)
            {
                // 3. Error: Vuelve a la vista de creación y muestra el error
                var dto = _useCase.GetPersonaParaCrear();
                dto.Persona = persona; // Asegura que se muestren los datos que el usuario intentó guardar
                ModelState.AddModelError("", $"Error al crear la persona: {ex.Message}");
                return View(dto);
            }
        }

        // GET: PersonaController/Edit/5
        public ActionResult Edit(int id)
        {
            var personaConDepartamentos = _useCase.GetPersonaConListaDepartamentos(id);
            if (personaConDepartamentos == null || personaConDepartamentos.Persona == null)
            {
                return NotFound();
            }
            return View(personaConDepartamentos);
        }

        // POST: PersonaController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Persona persona)
        {
            if (id != persona.id)
            {
                return NotFound();
            }

            // 1. Validar el modelo
            if (!ModelState.IsValid)
            {
                var dto = _useCase.GetPersonaConListaDepartamentos(id);
                dto.Persona = persona; // Preserva el input del usuario en el DTO
                return View(dto);
            }

            try
            {
                // 2. Actualizar la persona y verificar el resultado
                int rowsAffected = _useCase.ActualizarPersona(id, persona);

                if (rowsAffected > 0)
                {
                    // Éxito: Redirige a la lista
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    // Falló la actualización sin lanzar excepción
                    throw new Exception("La base de datos no pudo actualizar la persona. Revise el ID.");
                }
            }
            catch (Exception ex)
            {
                // 3. Error: Vuelve a la vista de edición y muestra el error
                var dto = _useCase.GetPersonaConListaDepartamentos(id);
                dto.Persona = persona; // Asegura que se muestren los datos que el usuario intentó guardar
                ModelState.AddModelError("", $"Error al editar la persona: {ex.Message}");
                return View(dto);
            }
        }

        // GET: PersonaController/Delete/5
        public ActionResult Delete(int id)
        {
            var persona = _useCase.GetDetallePersona(id);
            if (persona == null)
            {
                return NotFound();
            }
            return View(persona);
        }

        // POST: PersonaController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // Aquí podrías añadir también la verificación de rowsAffected si el Use Case devuelve int
                _useCase.EliminarPersona(id);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                // Si la eliminación falla
                ModelState.AddModelError("", "Error al eliminar la persona.");
                return View(); // Considera redirigir a Index o Details para mostrar el error más claramente.
            }
        }
    }
}