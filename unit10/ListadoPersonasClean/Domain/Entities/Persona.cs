namespace Domain.Entities
{
    public class Persona
    {
        #region Atributos privados
        private int _ID;
        private string _Nombre;
        private string _Apellidos;
        private DateTime _FechaNacimiento;
        private string _Direccion;
        private string _Telefono;
        private string _Foto;
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

        public string Apellidos
        {
            get { return _Apellidos; }
            set { _Apellidos = value; }
        }

        public DateTime FechaNacimiento
        {
            get { return _FechaNacimiento; }
            set { _FechaNacimiento = value; }
        }

        public string Direccion
        {
            get { return _Direccion; }
            set { _Direccion = value; }
        }

        public string Telefono
        {
            get { return _Telefono; }
            set { _Telefono = value; }
        }
        public string Foto
        {
            get { return _Foto; }
            set { _Foto = value; }
        }

        #endregion

        #region Constructores
        // Constructor vacío
        public Persona() { }

        // Constructor con parámetros
        public Persona(int ID, string Nombre, string Apellidos, DateTime FechaNacimiento, string Direccion, string Telefono, string Foto)
        {
            _ID = ID;
            _Nombre = Nombre;
            _Apellidos = Apellidos;
            _FechaNacimiento = FechaNacimiento;
            _Direccion = Direccion;
            _Telefono = Telefono;
            _Foto = Foto;
        }
        #endregion
    }
}
