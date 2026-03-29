namespace Ejercicio_1.Models.Entities
{
    public class clsDepartamento
    {

        private int _id;
        private string _nombre;

        public int Id
        {
            get { return _id; }
        }
        public string Nombre
        {
            get { return _nombre; }    
        }

        public clsDepartamento(int id, string nombre)
        {
            _id = id;
            _nombre = nombre;
        }
    }
}
