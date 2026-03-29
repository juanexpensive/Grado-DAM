using Domain.Utils;
using System;
using System.Text.Json.Serialization;

namespace Domain.Entities
{
    public class Pedido
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public int IdUsuario { get; set; }
        public int IdEmpresaProveedora { get; set; }
        public int IdEmpresaConsumidora { get; set; }
        public decimal PrecioTotal { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Estados Estado { get; set; }
        public bool Activo { get; set; }

        public Pedido() {}

        public Pedido(DateTime fecha, int idUsuario, int idEmpresaProveedora, int idEmpresaConsumidora, decimal precioTotal, string estado, bool activo = true)
        {
            Fecha = fecha;
            IdUsuario = idUsuario;
            IdEmpresaProveedora = idEmpresaProveedora;
            IdEmpresaConsumidora = idEmpresaConsumidora;
            PrecioTotal = precioTotal;
            Estado = (Estados)Enum.Parse(typeof(Estados), estado);
            Activo = activo;
        }
    }
}