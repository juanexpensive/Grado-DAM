using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Departamento
    {
        #region privates
        private int _ID;
        private string _Nombre;
        #endregion

        #region Getters y Setters
        public int ID
        {
            get { return _ID; }
            set { _ID = value; }
        }
        public string Nombre
        {
            get { return _Nombre; }
            set { _Nombre = value; }
        }
        #endregion

        #region Constructores
        // Constructor vacío
        public Departamento() { }

        // Constructor con parámetros
        public Departamento(int ID, string Nombre)
        {
            _ID = ID;
            _Nombre = Nombre;
            
        }
        #endregion
    }

}
