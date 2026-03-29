using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers
{
    public class DepartamentoController : Controller
    {
        private readonly IUseCaseDepartamentos _useCase;

        public DepartamentoController(IUseCaseDepartamentos useCase)
        {
            _useCase = useCase;
        }

        // GET: DepartamentoController
        public ActionResult Index()
        {
            return View(_useCase.GetDepartamentos());
        }

        // GET: DepartamentoController/Details/5
        public ActionResult Details(int id)
        {
            var departamento = _useCase.GetDetalleDepartamento(id);
            if (departamento == null)
            {
                return NotFound();
            }

            return View(departamento);
        }

        // GET: DepartamentoController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: DepartamentoController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Departamento departamento) // Recibe la entidad Departamento
        {
            // 1. Validar el modelo
            if (!ModelState.IsValid)
            {
                return View(departamento); // Vuelve a la vista, preservando los datos.
            }

            try
            {
                // 2. Crear el departamento
                _useCase.CrearDepartamento(departamento); // Asume que lanza una excepción si falla.

                // 3. Éxito: Redirigir a la lista
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                // 4. Error: Vuelve a la vista y muestra el error
                ModelState.AddModelError("", $"Error al crear el departamento: {ex.Message}");
                return View(departamento);
            }
        }

        // GET: DepartamentoController/Edit/5
        public ActionResult Edit(int id)
        {
            var departamento = _useCase.GetDepartamentoParaEditar(id);
            if (departamento == null)
            {
                return NotFound();
            }
            return View(departamento);
        }

        // POST: DepartamentoController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Departamento departamento)
        {
            // El ID de la ruta debe coincidir con el ID del objeto (proporcionado por el Model Binder)
            if (id != departamento.id)
            {
                return NotFound();
            }

            // 1. Validar el modelo
            if (!ModelState.IsValid)
            {
                return View(departamento); // Vuelve a la vista, preservando los datos.
            }

            try
            {
                // 2. Actualizar el departamento
                _useCase.ActualizarDepartamento(departamento); // Asume que lanza una excepción si falla.

                // 3. Éxito: Redirigir a la lista
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                // 4. Error: Vuelve a la vista y muestra el error
                ModelState.AddModelError("", $"Error al editar el departamento: {ex.Message}");
                return View(departamento);
            }
        }

        // GET: DepartamentoController/Delete/5
        public ActionResult Delete(int id)
        {
            var departamento = _useCase.GetDetalleDepartamento(id);
            if (departamento == null)
            {
                return NotFound();
            }

            var personas = _useCase.GetPersonasPorDepartamento(id);
            ViewBag.CantidadPersonas = personas.Count;
            ViewBag.TienePersonas = personas.Count > 0;

            return View(departamento);
        }

        // POST: DepartamentoController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                _useCase.EliminarDepartamento(id);
                return RedirectToAction(nameof(Index));
            }
            catch (InvalidOperationException ex)
            {
                // Maneja la excepción si el departamento tiene personas asignadas
                TempData["Error"] = ex.Message;
                return RedirectToAction(nameof(Delete), new { id = id });
            }
            catch (Exception ex)
            {
                // Captura otras excepciones genéricas y notifica
                TempData["Error"] = $"Ocurrió un error al intentar eliminar: {ex.Message}";
                return RedirectToAction(nameof(Index));
            }
        }
    }
}