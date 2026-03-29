using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTOs
{
    public class PersonaConNombreDeDepartamentoDTO
    {
        #region atributos privados
        private int _id;
        private string _nombre;
        private string _apellido;
        private DateTime _fechaNac;

        private string _direccion;

        private string _telefono;
        private string _imagen;
        private string _nombreDepartamento;

        #endregion

        #region getters y setters
        public int id { get { return _id; } set { _id = value; } }
        public string nombre
        {
            get { return _nombre; }
            set { _nombre = value; }
        }
        public string apellido
        {
            get { return _apellido; }
            set { _apellido = value; }
        }

        public DateTime fechaNac
        {
            get { return _fechaNac; }
            set { _fechaNac = value; }
        }

        public string direccion
        {
            get { return _direccion; }
            set { _direccion = value; }
        }

        public string telefono
        {
            get { return _telefono; }
            set { _telefono = value; }
        }

        public string imagen
        {
            get { return _imagen; }
        }
        public string nombreDepartamento
        {
            get { return _nombreDepartamento; }
            set { _nombreDepartamento = value; }
        }
        #endregion

        #region Constructores
        public PersonaConNombreDeDepartamentoDTO(int id, string nombre, string apellido,
               string direccion, string telefono, DateTime fechaNac, string imagen, string nombreDepartamento)
        {
            _id = id;
            _nombre = nombre;
            _apellido = apellido;
            _direccion = direccion;
            _telefono = telefono;
            _fechaNac = fechaNac;
            _imagen = imagen;
            _nombreDepartamento = nombreDepartamento;
        }
        #endregion
    }
}
