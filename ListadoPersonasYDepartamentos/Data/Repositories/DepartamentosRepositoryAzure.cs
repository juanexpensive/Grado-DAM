using Data.Database;
using Domain.Entities;
using Domain.Repositories;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class DepartamentosRepositoryAzure : IRepositoryDepartamentos
    {
        public int actualizarDepartamento(int idDepartamento, Departamento departamento)
        {
            int filasAfectadas = 0;

            using (SqlConnection miConexion = new SqlConnection(Connection.getConnectionString()))
            {
                string query = "UPDATE Departamentos SET Nombre = @Nombre WHERE ID = @ID";
                using (SqlCommand miComando = new SqlCommand(query, miConexion))
                {
                    miComando.Parameters.AddWithValue("@Nombre", departamento.nombre);
                    miComando.Parameters.AddWithValue("@ID", idDepartamento);

                    try
                    {
                        miConexion.Open();
                        filasAfectadas = miComando.ExecuteNonQuery();
                    }
                    catch (SqlException exSql)
                    {
                        throw exSql;
                    }
                }
            }

            return filasAfectadas;
        }

        public int crearDepartamento(Departamento departamentoNuevo)
        {
            int filasAfectadas = 0;

            using (SqlConnection miConexion = new SqlConnection(Connection.getConnectionString()))
            {
                string query = "INSERT INTO Departamentos (Nombre) VALUES (@Nombre)";
                using (SqlCommand miComando = new SqlCommand(query, miConexion))
                {
                    miComando.Parameters.AddWithValue("@Nombre", departamentoNuevo.nombre);

                    try
                    {
                        miConexion.Open();
                        filasAfectadas = miComando.ExecuteNonQuery();
                    }
                    catch (SqlException exSql)
                    {
                        throw exSql;
                    }
                }
            }

            return filasAfectadas;
        }

        public int eliminarDepartamento(int idDepartamento)
        {
            int filasAfectadas = 0;

            using (SqlConnection miConexion = new SqlConnection(Connection.getConnectionString()))
            {
                string query = "DELETE FROM Departamentos WHERE ID = @ID";
                using (SqlCommand miComando = new SqlCommand(query, miConexion))
                {
                    miComando.Parameters.AddWithValue("@ID", idDepartamento);

                    try
                    {
                        miConexion.Open();
                        filasAfectadas = miComando.ExecuteNonQuery();
                    }
                    catch (SqlException exSql)
                    {
                        throw exSql;
                    }
                }
            }

            return filasAfectadas;
        }

        public Departamento getDepartamentoById(int idDepartamento)
        {
            Departamento oDepartamento = null;

            using (SqlConnection miConexion = new SqlConnection(Connection.getConnectionString()))
            {
                string query = "SELECT * FROM Departamentos WHERE ID = @ID";
                using (SqlCommand miComando = new SqlCommand(query, miConexion))
                {
                    miComando.Parameters.AddWithValue("@ID", idDepartamento);

                    try
                    {
                        miConexion.Open();
                        using (SqlDataReader miLector = miComando.ExecuteReader())
                        {
                            if (miLector.Read())
                            {
                                oDepartamento = new Departamento((int)miLector["ID"], (string)miLector["Nombre"]);
                            }
                        }
                    }
                    catch (SqlException exSql)
                    {
                        throw exSql;
                    }
                }
            }

            return oDepartamento;
        }

        public Departamento[] getListaDepartamentos()
        {
            SqlConnection miConexion = new SqlConnection();
            List<Departamento> listadoDepartamentos = new List<Departamento>();
            SqlCommand miComando = new SqlCommand();
            SqlDataReader miLector = null;
            Departamento oDepartamento;

            miConexion.ConnectionString = Connection.getConnectionString();

            try
            {
                miConexion.Open();

                miComando.CommandText = "SELECT * FROM Departamentos";
                miComando.Connection = miConexion;

                miLector = miComando.ExecuteReader();

                if (miLector.HasRows)
                {
                    while (miLector.Read())
                    {
                        oDepartamento = new Departamento((int)miLector["ID"], (string)miLector["Nombre"]);

                        listadoDepartamentos.Add(oDepartamento);
                    }
                }

                miLector.Close();
                miConexion.Close();
            }
            catch (SqlException exSql)
            {
                throw exSql;
            }

            return listadoDepartamentos.ToArray();
        }
    }
}
