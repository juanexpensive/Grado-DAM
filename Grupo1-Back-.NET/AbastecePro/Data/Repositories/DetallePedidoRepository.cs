using Domain.Entities;
using Domain.Interfaces.Repositories;
using Microsoft.Data.SqlClient;
using Data.Database;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace Data.Repositories
{
    public class DetallePedidoRepository : IDetallePedidoRepository
    {
        string connectionString = Connection.getConnectionString();

        public async Task<DetallePedido[]> GetAllDetallesPedido()
        {
            List<DetallePedido> detalles = new List<DetallePedido>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM DetallePedido";
                SqlCommand cmd = new SqlCommand(query, conn);

                await conn.OpenAsync();
                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    DetallePedido detalle = new DetallePedido(
                        (int)reader["idPedido"],
                        (int)reader["idProducto"],
                        (int)reader["cantidadProducto"],
                        (decimal)reader["precioUnitario"]
                    )
                    {
                        Id = (int)reader["id"]
                    };
                    detalles.Add(detalle);
                }
                reader.Close();
            }
            return detalles.ToArray();
        }

        public async Task<DetallePedido> GetDetallePedidoById(int id)
        {
            DetallePedido detalle = null;
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM DetallePedido WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    detalle = new DetallePedido(
                        (int)reader["idPedido"],
                        (int)reader["idProducto"],
                        (int)reader["cantidadProducto"],
                        (decimal)reader["precioUnitario"]
                    )
                    {
                        Id = (int)reader["id"]
                    };
                }
                reader.Close();
            }
            return detalle;
        }

        public async Task<bool> AddDetallePedido(DetallePedido detallePedido)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "INSERT INTO DetallePedido (idPedido, idProducto, cantidadProducto, precioUnitario) VALUES (@idPedido, @idProducto, @cantidadProducto, @precioUnitario)";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@idPedido", detallePedido.IdPedido);
                cmd.Parameters.AddWithValue("@idProducto", detallePedido.IdProducto);
                cmd.Parameters.AddWithValue("@cantidadProducto", detallePedido.CantidadProducto);
                cmd.Parameters.AddWithValue("@precioUnitario", detallePedido.PrecioUnitario);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }

        public async Task<bool> UpdateDetallePedido(int id, DetallePedido detallePedido)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "UPDATE DetallePedido SET idPedido = @idPedido, idProducto = @idProducto, cantidadProducto = @cantidadProducto, precioUnitario = @precioUnitario WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@idPedido", detallePedido.IdPedido);
                cmd.Parameters.AddWithValue("@idProducto", detallePedido.IdProducto);
                cmd.Parameters.AddWithValue("@cantidadProducto", detallePedido.CantidadProducto);
                cmd.Parameters.AddWithValue("@precioUnitario", detallePedido.PrecioUnitario);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }

        public async Task<bool> DeleteDetallePedido(int id)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "DELETE FROM DetallePedido WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }
    }
}
