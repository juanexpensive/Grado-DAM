namespace Domain.Entities
{
    public class DetallePedido
    {
        public int Id { get; set; }
        public int IdPedido { get; set; }
        public int IdProducto { get; set; }
        public int CantidadProducto { get; set; }
        public decimal PrecioUnitario { get; set; }

        public DetallePedido() { }
        public DetallePedido(int idPedido, int idProducto, int cantidadProducto, decimal precioUnitario)
        {
            IdPedido = idPedido;
            IdProducto = idProducto;
            CantidadProducto = cantidadProducto;
            PrecioUnitario = precioUnitario;
        }
    }
}