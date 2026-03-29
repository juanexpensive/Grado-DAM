using Microsoft.AspNetCore.Mvc;

namespace _01HelloWorld.Controllers
{
    public class ProductosController : Controller
    {
        public IActionResult ListadoProductos()
        {
            return View();
        }
    }
}
