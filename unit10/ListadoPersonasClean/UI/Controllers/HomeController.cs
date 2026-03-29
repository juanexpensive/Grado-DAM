using Microsoft.AspNetCore.Mvc;
using UI.Models;
using System.Diagnostics;
using Domain.Interfaces;

namespace UI.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IListadoPersonasUseCases _useCaseListadoPersonas;

        public HomeController(ILogger<HomeController> logger, IListadoPersonasUseCases useCaseListadoPersonas)
        {
            _logger = logger;
            _useCaseListadoPersonas = useCaseListadoPersonas;
        }

        public IActionResult Index()
        {

            // Llamamos al caso de uso para obtener las personas
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
