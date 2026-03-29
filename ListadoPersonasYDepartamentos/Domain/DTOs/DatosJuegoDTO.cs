using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTOs
{
    using System.Collections.Generic;

    public class DatosJuegoDTO
    {
        public List<PersonaJuegoDTO> Personas { get; set; }
        public List<DepartamentoJuegoDTO> Departamentos { get; set; }
    }
}