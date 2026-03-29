using Domain.Entities;
using Domain.Interfaces.Repositories;
using Microsoft.Data.SqlClient;
using Data.Database;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace Data.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        string connectionString = Connection.getConnectionString();

        /// <summary>
        /// Obtiene todos los registros de usuarios de la base de datos.
        /// Precondiciones: La conexión a la base de datos debe estar disponible.
        /// Postcondiciones: Retorna un arreglo con todos los usuarios encontrados.
        /// </summary>
        public async Task<Usuario[]> GetAllUsuarios()
        {
            List<Usuario> usuarios = new List<Usuario>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Usuario";
                SqlCommand cmd = new SqlCommand(query, conn);

                await conn.OpenAsync();
                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Usuario usuario = new Usuario(
                        reader["nombre"].ToString(),
                        reader["apellidos"].ToString(),
                        reader["correo"].ToString(),
                        reader["telefono"].ToString(),
                        reader["rol"].ToString(),
                        reader["firebase_uid"].ToString(),
                        (bool)reader["activo"]
                    )
                    {
                        Id = (int)reader["id"]
                    };
                    usuarios.Add(usuario);
                }
                reader.Close();
            }
            return usuarios.ToArray();
        }

        /// <summary>
        /// Obtiene un usuario por su identificador único.
        /// Precondiciones: El ID debe ser válido.
        /// Postcondiciones: Retorna la entidad del usuario si se encuentra, de lo contrario null.
        /// </summary>
        public async Task<Usuario> GetUsuarioById(int id)
        {
            Usuario usuario = null;
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Usuario WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    usuario = new Usuario(
                        reader["nombre"].ToString(),
                        reader["apellidos"].ToString(),
                        reader["correo"].ToString(),
                        reader["telefono"].ToString(),
                        reader["rol"].ToString(),
                        reader["firebase_uid"].ToString(),
                        (bool)reader["activo"]
                    )
                    {
                        Id = (int)reader["id"]
                    };
                }
                reader.Close();
            }
            return usuario;
        }

        /// <summary>
        /// Agrega un nuevo usuario a la base de datos.
        /// Precondiciones: El objeto usuario no debe ser nulo y debe tener datos válidos.
        /// Postcondiciones: Retorna true si el usuario fue insertado correctamente.
        /// </summary>
        public async Task<bool> AddUsuario(Usuario usuario)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "INSERT INTO Usuario (nombre, apellidos, correo, telefono, rol, activo, firebase_uid, idEmpresa) VALUES (@nombre, @apellidos, @correo, @telefono, @rol, @activo, @firebase_uid,1)";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@nombre", usuario.Nombre);
                cmd.Parameters.AddWithValue("@apellidos", usuario.Apellidos);
                cmd.Parameters.AddWithValue("@correo", usuario.Correo);
                cmd.Parameters.AddWithValue("@telefono", usuario.Telefono);
                cmd.Parameters.AddWithValue("@rol", (int)usuario.Rol);
                cmd.Parameters.AddWithValue("@activo", usuario.Activo);
                cmd.Parameters.AddWithValue("@firebase_uid", usuario.Firebase_uid);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }

        /// <summary>
        /// Actualiza un usuario existente en la base de datos.
        /// Precondiciones: El ID debe existir y los nuevos datos ser válidos.
        /// Postcondiciones: Retorna true si la actualización fue exitosa.
        /// </summary>
        public async Task<bool> UpdateUsuario(int id, Usuario usuario)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "UPDATE Usuario SET nombre = @nombre, apellidos = @apellidos, correo = @correo, telefono = @telefono, rol = @rol, activo = @activo, firebase_uid = @firebase_uid WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@nombre", usuario.Nombre);
                cmd.Parameters.AddWithValue("@apellidos", usuario.Apellidos);
                cmd.Parameters.AddWithValue("@correo", usuario.Correo);
                cmd.Parameters.AddWithValue("@telefono", usuario.Telefono);
                cmd.Parameters.AddWithValue("@rol", (int)usuario.Rol);
                cmd.Parameters.AddWithValue("@activo", usuario.Activo);
                cmd.Parameters.AddWithValue("@firebase_uid", usuario.Firebase_uid);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }

        /// <summary>
        /// Desactiva un usuario en la base de datos.
        /// Precondiciones: El ID debe existir.
        /// Postcondiciones: Retorna true si el usuario fue desactivado correctamente.
        /// </summary>
        public async Task<bool> DeleteUsuario(int id)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "UPDATE Usuario SET activo = 0 WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }
    }
}