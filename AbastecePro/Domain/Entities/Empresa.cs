namespace Domain.Entities
{
    public class Empresa
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Cif { get; set; }
        public int IdDireccion { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
        public string Iban { get; set; }
        public bool Activo { get; set; }

        public Empresa() { }
        public Empresa(string nombre, string cif, int idDireccion, string telefono, string correo, string iban, bool activo = true)
        {
            Nombre = nombre;
            Cif = cif;
            IdDireccion = idDireccion;
            Telefono = telefono;
            Correo = correo;
            Iban = iban;
            Activo = activo;
        }
    }
}