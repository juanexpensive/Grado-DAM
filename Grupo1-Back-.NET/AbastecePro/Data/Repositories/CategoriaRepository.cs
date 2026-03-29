using Domain.Entities;
using Domain.Interfaces.Repositories;
using Microsoft.Data.SqlClient;
using Data.Database;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class CategoriaRepository : ICategoriaRepository
    {
        string connectionString = Connection.getConnectionString();


        /// <summary>
        /// Agrega una nueva categoría a la base de datos.
        /// Precondiciones: El objeto categoría no debe ser nulo y debe tener un nombre válido.
        /// Postcondiciones: Retorna true si la categoría fue insertada, de lo contrario false.
        /// </summary>
        public async Task<bool> AddCategoria(Categoria categoria)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "INSERT INTO Categoria (nombre, activo) VALUES (@nombre, @activo)";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@nombre", categoria.Nombre);
                cmd.Parameters.AddWithValue("@activo", categoria.Activo);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }

        /// <summary>
        /// Obtiene todas las categorías de la base de datos.
        /// Precondiciones: La conexión a la base de datos debe estar disponible.
        /// Postcondiciones: Retorna un arreglo con todas las categorías encontradas.
        /// </summary>
        public async Task<Categoria[]> GetAllCategorias()
        {
            List<Categoria> categorias = new List<Categoria>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Categoria";
                SqlCommand cmd = new SqlCommand(query, conn);

                await conn.OpenAsync();
                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Categoria cat = new Categoria
                    {
                        Id = (int)reader["id"],
                        Nombre = reader["nombre"].ToString(),
                        Activo = (bool)reader["activo"]
                    };
                    categorias.Add(cat);
                }

                reader.Close();
            }

            return categorias.ToArray();
        }


        /// <summary>
        /// Obtiene una categoría por su identificador.
        /// Precondiciones: El ID debe ser válido.
        /// Postcondiciones: Retorna la categoría encontrada o null si no existe.
        /// </summary>
        public async Task<Categoria> GetCategoriaById(int id)
        {
            Categoria categoria = null;
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Categoria WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    categoria = new Categoria
                    {
                        Id = (int)reader["id"],
                        Nombre = reader["nombre"].ToString(),
                        Activo = (bool)reader["activo"]
                    };
                }
                reader.Close();
            }
            return categoria;
        }

        /// <summary>
        /// Actualiza una categoría existente en la base de datos.
        /// Precondiciones: El ID debe existir y los nuevos datos deben ser válidos.
        /// Postcondiciones: Retorna true si la actualización fue exitosa, de lo contrario false.
        /// </summary>
        public async Task<bool> UpdateCategoria(int id, Categoria categoria)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "UPDATE Categoria SET nombre = @nombre, activo = @activo WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@nombre", categoria.Nombre);
                cmd.Parameters.AddWithValue("@activo", categoria.Activo);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }

        /// <summary>
        /// Desactiva una categoría por su identificador.
        /// Precondiciones: El ID debe existir.
        /// Postcondiciones: Retorna true si la categoría fue desactivada correctamente.
        /// </summary>
        public async Task<bool> DeleteCategoria(int id)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "UPDATE Categoria SET activo = 0 WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }
    }
}
