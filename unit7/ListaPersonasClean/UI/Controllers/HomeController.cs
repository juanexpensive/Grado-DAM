using DOMAIN.UseCases.interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using UI.Models;

namespace UI.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        //Declaramos el caso de uso que servirá a todo este controller
        //Si vemos que inyectar el caso de uso es demasiado costoso porque haya Actions que no 
        //van a hacer uso de él y la instanciación de caso de uso es costosa porque llama a una API o BBDD,
        // podremos inyectar el caso de uso al Action

        // private readonly IPeopleListUseCase _peopleListUseCase;

        //Esta sería la forma de hacerlo si queremos inyectar el caso de uso en el constructor
        public HomeController(ILogger<HomeController> logger /*, IPeopleListUseCase peopleListUseCase*/)
        {
            //Le asignamos a nuestro caso de uso la inyección
            // _peopleListUseCase = peopleListUseCase;
            _logger = logger;
        }


        //Esta sería la forma de hacerlo si lo inyectamos al Action
        public IActionResult Index([FromServices] IPeopleListUseCase peopleListUseCase)
        {
            return View(peopleListUseCase.getPeopleList());
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