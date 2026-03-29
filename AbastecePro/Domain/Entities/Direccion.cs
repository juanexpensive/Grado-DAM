namespace Domain.Entities
{
    public class Direccion
    {
        public int Id { get; set; }
        public string Calle { get; set; }
        public string Numero { get; set; }
        public string Ciudad { get; set; }
        public string Pais { get; set; }
        public string CodigoPostal { get; set; }
        public bool Activo { get; set; }

        public Direccion() { }
        public Direccion(string calle, string numero, string ciudad, string pais, string codigoPostal, bool activo = true)
        {
            Calle = calle;
            Numero = numero;
            Ciudad = ciudad;
            Pais = pais;
            CodigoPostal = codigoPostal;
            Activo = activo;
        }
    }
}
