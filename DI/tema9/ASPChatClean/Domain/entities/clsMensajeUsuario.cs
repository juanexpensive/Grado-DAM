using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace domain.entities
{
    internal class clsMensajeUsuario
    {
        private string _name;
        private string _message;

        public string name
        {
            get { return _name; }
            set { _name = value; }
        }

        public string message
        {
            get { return _message; }
            set { _message = value; }
        }

        public clsMensajeUsuario(string name, string message)
        {
            this._name = name;
            this._message = message;
        }

    }

}
