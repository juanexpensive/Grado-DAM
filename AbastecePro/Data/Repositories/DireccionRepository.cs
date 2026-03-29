using Domain.Entities;
using Domain.Interfaces.Repositories;
using Microsoft.Data.SqlClient;
using Data.Database;
using Domain.Interfaces;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class DireccionRepository : IDireccionRepository
    {
        string connectionString = Connection.getConnectionString();

        public async Task<bool> AddDireccion(Direccion direccion)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "INSERT INTO Direccion (calle, numero, ciudad, pais, codigoPostal, activo) VALUES (@calle, @numero, @ciudad, @pais, @codigoPostal, @activo)";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@calle", direccion.Calle);
                cmd.Parameters.AddWithValue("@numero", direccion.Numero);
                cmd.Parameters.AddWithValue("@ciudad", direccion.Ciudad);
                cmd.Parameters.AddWithValue("@pais", direccion.Pais);
                cmd.Parameters.AddWithValue("@codigoPostal", direccion.CodigoPostal);
                cmd.Parameters.AddWithValue("@activo", direccion.Activo);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }



        public async Task<Direccion[]> GetAllDirecciones()
        {
             List<Direccion> direcciones = new List<Direccion>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Direccion";
                // Optionally filter by activo = 1 if soft delete is strictly followed for retrieval
                // but GetAll usually implies checking all, let's keep it simple mostly.
                // Actually CategoriaRepository GetAllCategorias fetched all.
                
                SqlCommand cmd = new SqlCommand(query, conn);

                await conn.OpenAsync();
                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Direccion direccion = new Direccion(
                        reader["calle"].ToString(),
                        reader["numero"].ToString(),
                        reader["ciudad"].ToString(),
                        reader["pais"].ToString(),
                        reader["codigoPostal"].ToString(),
                        (bool)reader["activo"]
                    )
                    {
                        Id = (int)reader["id"]
                    };
                    direcciones.Add(direccion);
                }
                reader.Close();
            }
            return direcciones.ToArray();
        }

        public async Task<Direccion> GetDireccionById(int id)
        {
            Direccion direccion = null;
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Direccion WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    direccion = new Direccion(
                        reader["calle"].ToString(),
                        reader["numero"].ToString(),
                        reader["ciudad"].ToString(),
                        reader["pais"].ToString(),
                        reader["codigoPostal"].ToString(),
                        (bool)reader["activo"]
                    )
                    {
                        Id = (int)reader["id"]
                    };
                }
                reader.Close();
            }
            return direccion;
        }

        public async Task<bool> UpdateDireccion(int id, Direccion direccion)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "UPDATE Direccion SET calle = @calle, numero = @numero, ciudad = @ciudad, pais = @pais, codigoPostal = @codigoPostal, activo = @activo WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@calle", direccion.Calle);
                cmd.Parameters.AddWithValue("@numero", direccion.Numero);
                cmd.Parameters.AddWithValue("@ciudad", direccion.Ciudad);
                cmd.Parameters.AddWithValue("@pais", direccion.Pais);
                cmd.Parameters.AddWithValue("@codigoPostal", direccion.CodigoPostal);
                cmd.Parameters.AddWithValue("@activo", direccion.Activo);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }

        public async Task<bool> DeleteDireccion(int id)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "UPDATE Direccion SET activo = 0 WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }
    }
}
