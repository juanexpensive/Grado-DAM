using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.entities
{
    public class Departamento
    {
        // Atributos privados según el esquema
        private int _id;
        private string _nombre;

        // Propiedades públicas para el acceso (GETTERS y SETTERS)
        public int Id { get => _id; set => _id = value; }
        public string Nombre { get => _nombre; set => _nombre = value; }

        // Constructor
        public Departamento(int id, string nombre)
        {
            _id = id;
            _nombre = nombre;
        }
    }
}