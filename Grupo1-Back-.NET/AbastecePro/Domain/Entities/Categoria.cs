using System;

namespace Domain.Entities
{
    public class Categoria
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public bool Activo { get; set; }

        public Categoria(){}

        public Categoria(string nombre, bool activo = true)
        {
            Nombre = nombre;
            Activo = activo;
        }

        public Categoria(int id, string nombre, bool activo = true)
        {
            Id = id;
            Nombre = nombre;
            Activo = activo;
        }
    }
}