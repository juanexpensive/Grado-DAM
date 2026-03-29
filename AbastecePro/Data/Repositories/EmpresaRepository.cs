using Domain.Entities;
using Domain.Interfaces.Repositories;
using Microsoft.Data.SqlClient;
using Data.Database;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class EmpresaRepository : IEmpresaRepository
    {
        string connectionString = Connection.getConnectionString();

        public async Task<bool> AddEmpresa(Empresa empresa)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "INSERT INTO Empresa (nombre, cif, idDireccion, telefono, correo, iban, activo) VALUES (@nombre, @cif, @idDireccion, @telefono, @correo, @iban, @activo)";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@nombre", empresa.Nombre);
                cmd.Parameters.AddWithValue("@cif", empresa.Cif);
                cmd.Parameters.AddWithValue("@idDireccion", empresa.IdDireccion);
                cmd.Parameters.AddWithValue("@telefono", empresa.Telefono);
                cmd.Parameters.AddWithValue("@correo", empresa.Correo);
                cmd.Parameters.AddWithValue("@iban", empresa.Iban);
                cmd.Parameters.AddWithValue("@activo", empresa.Activo);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }

        public async Task<Empresa[]> GetAllEmpresas()
        {
             List<Empresa> empresas = new List<Empresa>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Empresa";
                SqlCommand cmd = new SqlCommand(query, conn);

                await conn.OpenAsync();
                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Empresa empresa = new Empresa(
                        reader["nombre"].ToString(),
                        reader["cif"].ToString(),
                        (int)reader["idDireccion"],
                        reader["telefono"].ToString(),
                        reader["correo"].ToString(),
                        reader["iban"].ToString(),
                        (bool)reader["activo"]
                    )
                    {
                        Id = (int)reader["id"]
                    };
                    empresas.Add(empresa);
                }
                reader.Close();
            }
            return empresas.ToArray();
        }

        public async Task<Empresa> GetEmpresaById(int id)
        {
             Empresa empresa = null;
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Empresa WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    empresa = new Empresa(
                        reader["nombre"].ToString(),
                        reader["cif"].ToString(),
                        (int)reader["idDireccion"],
                        reader["telefono"].ToString(),
                        reader["correo"].ToString(),
                        reader["iban"].ToString(),
                        (bool)reader["activo"]
                    )
                    {
                        Id = (int)reader["id"]
                    };
                }
                reader.Close();
            }
            return empresa;
        }



        public async Task<bool> UpdateEmpresa(int id, Empresa empresa)
        {
             using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "UPDATE Empresa SET nombre = @nombre, cif = @cif, idDireccion = @idDireccion, telefono = @telefono, correo = @correo, iban = @iban, activo = @activo WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@nombre", empresa.Nombre);
                cmd.Parameters.AddWithValue("@cif", empresa.Cif);
                cmd.Parameters.AddWithValue("@idDireccion", empresa.IdDireccion);
                cmd.Parameters.AddWithValue("@telefono", empresa.Telefono);
                cmd.Parameters.AddWithValue("@correo", empresa.Correo);
                cmd.Parameters.AddWithValue("@iban", empresa.Iban);
                cmd.Parameters.AddWithValue("@activo", empresa.Activo);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }

        public async Task<bool> DeleteEmpresa(int id)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "UPDATE Empresa SET activo = 0 WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }
    }
}
