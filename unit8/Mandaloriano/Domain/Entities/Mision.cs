using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    internal class Mision
    {
        #region Fields (Private Backing Fields)
        private int _id;
        private string _titulo;
        private string _descripcion;
        private int _creditos;
        #endregion

        #region Properties
        public int Id
        {
            get { return _id; }
        }

        public string Titulo
        {
            set {  }
            get { return _titulo; }
        }
        #endregion

        #region Constructors
        public Mision() { }

        public Mision(int id, string titulo, string descripcion, string creditos)
        {
            _id = id;
            _titulo = titulo;
            _descripcion = descripcion;
            _creditos = creditos;
        }
        #endregion
    }
}
}
