namespace Domain.Entities
{
    public class Producto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public int Stock { get; set; }
        public int IdCategoria { get; set; }
        public int IdEmpresaProveedora { get; set; }
        public bool Activo { get; set; }

        public Producto() { }
        public Producto(string nombre, string descripcion, decimal precio, int stock, int idCategoria, int idEmpresaProveedora, bool activo = true)
        {
            Nombre = nombre;
            Descripcion = descripcion;
            Precio = precio;
            Stock = stock;
            IdCategoria = idCategoria;
            IdEmpresaProveedora = idEmpresaProveedora;
            Activo = activo;
        }
    }
}