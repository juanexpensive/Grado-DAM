namespace UI.Controllers
{
    using Domain.Interfaces;
    using Microsoft.AspNetCore.Mvc;
    using System.Collections.Generic;

    public class JuegoController : Controller
    {
        private readonly IUseCaseJuego _useCase;

        public JuegoController(IUseCaseJuego useCase)
        {
            _useCase = useCase;
        }

        public IActionResult Index()
        {
            var datos = _useCase.ObtenerDatosJuego();
            return View(datos);
        }

        [HttpPost]
        public IActionResult Comprobar(Dictionary<int, int> asignaciones)
        {
            var resultado = _useCase.ComprobarDepartamentos(asignaciones);
            var datos = _useCase.ObtenerDatosJuego();

            ViewBag.Resultado = resultado;
            return View("Index", datos);
        }
    }
}