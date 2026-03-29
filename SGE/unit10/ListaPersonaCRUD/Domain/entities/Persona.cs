using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.entities
{
    public class Persona
    {
        // Atributos privados según el esquema
        private int _id;
        private string _nombre;
        private string _apellidos;
        private int _edad;
        private DateTime _fechaNacimiento;
        private string _direccion;
        private string _telefono;
        private int _idDepartamento; // Necesario para la relación

        // Propiedades públicas para el acceso (GETTERS y SETTERS)
        public int Id { get => _id; set => _id = value; }
        public string Nombre { get => _nombre; set => _nombre = value; }
        public string Apellidos { get => _apellidos; set => _apellidos = value; }
        public int Edad { get => _edad; set => _edad = value; }
        public DateTime FechaNacimiento { get => _fechaNacimiento; set => _fechaNacimiento = value; }
        public string Direccion { get => _direccion; set => _direccion = value; }
        public string Telefono { get => _telefono; set => _telefono = value; }
        public int IdDepartamento { get => _idDepartamento; set => _idDepartamento = value; }

        // Constructor para inicializar todos los atributos
        public Persona(int id, string nombre, string apellidos, int edad, DateTime fechaNacimiento, string direccion, string telefono, int idDepartamento)
        {
            _id = id;
            _nombre = nombre;
            _apellidos = apellidos;
            _edad = edad;
            _fechaNacimiento = fechaNacimiento;
            _direccion = direccion;
            _telefono = telefono;
            _idDepartamento = idDepartamento;
        }
    }
}