using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ResultadoJuego
    {
        public int Aciertos { get; set; }
        public int Total { get; set; }
        public bool Gano { get; set; }
    }
}
