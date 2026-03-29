using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    internal class clsPersona
    {
        #region Fields (Private Backing Fields)
        private int _id;
        private string _nombre;
        private int _idDepartamento;
        #endregion

        #region Properties
        public int Id
        {
            get { return _id; }
        }

        public string Nombre
        {
            get { return _nombre; }
        }
        #endregion

        #region Constructors
        public clsPersona() { }

        public clsPersona(int id, string nombre)
        {
            _id = id;
            _nombre = nombre;
        }
        #endregion
    }
}
