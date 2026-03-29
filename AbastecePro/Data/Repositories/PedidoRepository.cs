using Domain.Entities;
using Domain.Interfaces.Repositories;
using Microsoft.Data.SqlClient;
using Data.Database;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace Data.Repositories
{
    public class PedidoRepository : IPedidoRepository
    {
        string connectionString = Connection.getConnectionString();

        /// <summary>
        /// Obtiene todos los pedidos de la base de datos.
        /// Precondiciones: La conexión a la base de datos debe estar disponible.
        /// Postcondiciones: Retorna un arreglo con todos los pedidos encontrados.
        /// </summary>
        public async Task<Pedido[]> GetAllPedidos()
        {
            List<Pedido> pedidos = new List<Pedido>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Pedido";
                SqlCommand cmd = new SqlCommand(query, conn);

                await conn.OpenAsync();
                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Pedido pedido = new Pedido(
                        (DateTime)reader["fecha"],
                        (int)reader["idUsuario"],
                        (int)reader["idEmpresaProveedora"],
                        (int)reader["idEmpresaConsumidora"],
                        (decimal)reader["precioTotal"],
                        reader["estado"].ToString(),
                        (bool)reader["activo"]
                    )
                    {
                        Id = (int)reader["id"]
                    };
                    pedidos.Add(pedido);
                }
                reader.Close();
            }
            return pedidos.ToArray();
        }

        /// <summary>
        /// Obtiene un pedido por su identificador único.
        /// Precondiciones: El ID debe ser válido.
        /// Postcondiciones: Retorna la entidad del pedido si se encuentra, de lo contrario null.
        /// </summary>
        public async Task<Pedido> GetPedidoById(int id)
        {
            Pedido pedido = null;
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Pedido WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    pedido = new Pedido(
                         (DateTime)reader["fecha"],
                         (int)reader["idUsuario"],
                         (int)reader["idEmpresaProveedora"],
                         (int)reader["idEmpresaConsumidora"],
                         (decimal)reader["precioTotal"],
                         reader["estado"].ToString(),
                         (bool)reader["activo"]
                     )
                    {
                        Id = (int)reader["id"]
                    };
                }
                reader.Close();
            }
            return pedido;
        }

        /// <summary>
        /// Agrega un nuevo pedido a la base de datos.
        /// Precondiciones: El objeto pedido no debe ser nulo y debe tener datos válidos.
        /// Postcondiciones: Retorna true si el pedido fue insertado correctamente.
        /// </summary>
        public async Task<bool> AddPedido(Pedido pedido)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "INSERT INTO Pedido (fecha, idUsuario, idEmpresaProveedora, idEmpresaConsumidora, precioTotal, estado, activo) VALUES (@fecha, @idUsuario, @idEmpresaProveedora, @idEmpresaConsumidora, @precioTotal, @estado, @activo)";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@fecha", pedido.Fecha);
                cmd.Parameters.AddWithValue("@idUsuario", pedido.IdUsuario);
                cmd.Parameters.AddWithValue("@idEmpresaProveedora", pedido.IdEmpresaProveedora);
                cmd.Parameters.AddWithValue("@idEmpresaConsumidora", pedido.IdEmpresaConsumidora);
                cmd.Parameters.AddWithValue("@precioTotal", pedido.PrecioTotal);
                cmd.Parameters.AddWithValue("@estado", pedido.Estado.ToString());
                cmd.Parameters.AddWithValue("@activo", pedido.Activo);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }

        /// <summary>
        /// Actualiza un pedido existente en la base de datos.
        /// Precondiciones: El ID debe existir y los nuevos datos ser válidos.
        /// Postcondiciones: Retorna true si la actualización fue exitosa.
        /// </summary>
        public async Task<bool> UpdatePedido(int id, Pedido pedido)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "UPDATE Pedido SET fecha = @fecha, idUsuario = @idUsuario, idEmpresaProveedora = @idEmpresaProveedora, idEmpresaConsumidora = @idEmpresaConsumidora, precioTotal = @precioTotal, estado = @estado, activo = @activo WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@fecha", pedido.Fecha);
                cmd.Parameters.AddWithValue("@idUsuario", pedido.IdUsuario);
                cmd.Parameters.AddWithValue("@idEmpresaProveedora", pedido.IdEmpresaProveedora);
                cmd.Parameters.AddWithValue("@idEmpresaConsumidora", pedido.IdEmpresaConsumidora);
                cmd.Parameters.AddWithValue("@precioTotal", pedido.PrecioTotal);
                cmd.Parameters.AddWithValue("@estado", pedido.Estado.ToString());
                cmd.Parameters.AddWithValue("@activo", pedido.Activo);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }

        /// <summary>
        /// Desactiva un pedido en la base de datos.
        /// Precondiciones: El ID debe existir.
        /// Postcondiciones: Retorna true si el pedido fue desactivado correctamente.
        /// </summary>
        public async Task<bool> DeletePedido(int id)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "UPDATE Pedido SET activo = 0 WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }
    }
}
