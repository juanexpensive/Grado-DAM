using Domain.Utils;
using System;

namespace Domain.Entities
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Correo { get; set; }
        public string Telefono { get; set; }
        public Roles Rol { get; set; }
        public string Firebase_uid { get; set; }
        public bool Activo { get; set; }

        public Usuario() { }

        public Usuario(string nombre, string apellidos, string correo, string telefono, string rol, string firebase_uid, bool activo = true)


        {
            Nombre = nombre;
            Apellidos = apellidos;
            Correo = correo;
            Telefono = telefono;
            Rol = (Roles)Enum.Parse(typeof(Roles), rol);
            Firebase_uid = firebase_uid;
            Activo = activo;

        }
    }
}