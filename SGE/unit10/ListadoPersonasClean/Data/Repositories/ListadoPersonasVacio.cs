using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Interfaces;

namespace Data.Repositories
{
    public class ListadoPersonasVacio : IListadoPersonasRepository
    {
        private List<Persona> _listadoPersonas;

        public ListadoPersonasVacio()
        {
            _listadoPersonas = new List<Persona>();
        }

        public List<Persona> obtenerListadoPersonas()
        {
            return _listadoPersonas;
        }
    }
}