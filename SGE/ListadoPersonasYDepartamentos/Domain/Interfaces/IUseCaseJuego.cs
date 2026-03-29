using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    using Domain.DTOs;
    using Domain.Entities;
    using System.Collections.Generic;

    public interface IUseCaseJuego
    {
        DatosJuegoDTO ObtenerDatosJuego();
        ResultadoJuego ComprobarDepartamentos(Dictionary<int, int> asignaciones);
    }
}