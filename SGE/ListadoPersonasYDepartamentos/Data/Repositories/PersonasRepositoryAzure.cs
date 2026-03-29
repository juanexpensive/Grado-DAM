using Domain.Entities;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Database;

namespace Data.Repositories
{
    public class PersonasRepositoryAzure : IRepositoryPersonas
    {
        public int actualizarPersona(int idPersona, Persona persona)
        {
            int filasAfectadas = 0;

            using (SqlConnection miConexion = new SqlConnection(Connection.getConnectionString()))
            {
                string query = @"UPDATE Personas 
                                 SET Nombre = @Nombre, Apellidos = @Apellidos, Direccion = @Direccion, 
                                     Telefono = @Telefono, Foto = @Foto, IDDepartamento = @IDDepartamento, FechaNacimiento = @FechaNacimiento 
                                 WHERE ID = @ID";

                using (SqlCommand miComando = new SqlCommand(query, miConexion))
                {
                    miComando.Parameters.AddWithValue("@Nombre", persona.nombre);
                    miComando.Parameters.AddWithValue("@Apellidos", persona.apellido);
                    miComando.Parameters.AddWithValue("@Direccion", persona.direccion);
                    miComando.Parameters.AddWithValue("@Telefono", persona.telefono);
                    miComando.Parameters.AddWithValue("@Foto", persona.imagen);
                    miComando.Parameters.AddWithValue("@IDDepartamento", persona.idDepartamento);
                    miComando.Parameters.AddWithValue("@FechaNacimiento", (object)persona.fechaNac ?? DBNull.Value);
                    miComando.Parameters.AddWithValue("@ID", idPersona);

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

        public int crearPersona(Persona personaNueva)
        {
            int filasAfectadas = 0;

            using (SqlConnection miConexion = new SqlConnection(Connection.getConnectionString()))
            {
                string query = @"INSERT INTO Personas 
                                 (Nombre, Apellidos, Direccion, Telefono, Foto, IDDepartamento, FechaNacimiento) 
                                 VALUES 
                                 (@Nombre, @Apellidos, @Direccion, @Telefono, @Foto, @IDDepartamento, @FechaNacimiento)";

                using (SqlCommand miComando = new SqlCommand(query, miConexion))
                {
                    miComando.Parameters.AddWithValue("@Nombre", personaNueva.nombre);
                    miComando.Parameters.AddWithValue("@Apellidos", personaNueva.apellido);
                    miComando.Parameters.AddWithValue("@Direccion", personaNueva.direccion);
                    miComando.Parameters.AddWithValue("@Telefono", personaNueva.telefono);
                    miComando.Parameters.AddWithValue("@Foto", personaNueva.imagen);
                    miComando.Parameters.AddWithValue("@IDDepartamento", personaNueva.idDepartamento);
                    miComando.Parameters.AddWithValue("@FechaNacimiento", (object)personaNueva.fechaNac ?? DBNull.Value);

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

        public int eliminarPersona(int idPersona)
        {
            int filasAfectadas = 0;

            using (SqlConnection miConexion = new SqlConnection(Connection.getConnectionString()))
            {
                string query = "DELETE FROM Personas WHERE ID = @ID";

                using (SqlCommand miComando = new SqlCommand(query, miConexion))
                {
                    miComando.Parameters.AddWithValue("@ID", idPersona);

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

        public Persona getPersonaById(int idPersona)
        {
            Persona oPersona = null;

            using (SqlConnection miConexion = new SqlConnection(Connection.getConnectionString()))
            {
                string query = "SELECT * FROM Personas WHERE ID = @ID";

                using (SqlCommand miComando = new SqlCommand(query, miConexion))
                {
                    miComando.Parameters.AddWithValue("@ID", idPersona);

                    try
                    {
                        miConexion.Open();
                        using (SqlDataReader miLector = miComando.ExecuteReader())
                        {
                            if (miLector.Read())
                            {
                                oPersona = new Persona(
                                    (int)miLector["ID"],
                                    (string)miLector["Nombre"],
                                    (string)miLector["Apellidos"],
                                    (string)miLector["Direccion"],
                                    (string)miLector["Telefono"],
                                    (string)miLector["Foto"],
                                    (int)miLector["IDDepartamento"]
                                );

                                if (miLector["FechaNacimiento"] != DBNull.Value)
                                {
                                    oPersona.fechaNac = (DateTime)miLector["FechaNacimiento"];
                                }
                            }
                        }
                    }
                    catch (SqlException exSql)
                    {
                        throw exSql;
                    }
                }
            }

            return oPersona;
        }

        public int contarPersonadepartamento(int idDepartamento)
        {
            int contador = 0;

            using (SqlConnection miConexion = new SqlConnection(Connection.getConnectionString()))
            {
                string query = "SELECT COUNT(*) FROM Personas WHERE IDDepartamento = @IDDepartamento";

                using (SqlCommand miComando = new SqlCommand(query, miConexion))
                {
                    miComando.Parameters.AddWithValue("@IDDepartamento", idDepartamento);

                    try
                    {
                        miConexion.Open();
                        contador = (int)miComando.ExecuteScalar();
                    }
                    catch (SqlException exSql)
                    {
                        throw exSql;
                    }
                }
            }

            return contador;
        }

        public Persona[] getListaPersonas()
        {
            SqlConnection miConexion = new SqlConnection();
            List<Persona> listadoPersonas = new List<Persona>();
            SqlCommand miComando = new SqlCommand();
            SqlDataReader miLector = null;
            Persona oPersona;

            miConexion.ConnectionString = Connection.getConnectionString();

            try
            {
                miConexion.Open();

                miComando.CommandText = "SELECT * FROM Personas";
                miComando.Connection = miConexion;

                miLector = miComando.ExecuteReader();

                if (miLector.HasRows)
                {
                    while (miLector.Read())
                    {
                        oPersona = new Persona(
                            (int)miLector["ID"],
                            (string)miLector["Nombre"],
                            (string)miLector["Apellidos"],
                            (string)miLector["Direccion"],
                            (string)miLector["Telefono"],
                            (string)miLector["Foto"],
                            (int)miLector["IDDepartamento"]
                        );

                        if (miLector["FechaNacimiento"] != DBNull.Value)
                        {
                            oPersona.fechaNac = (DateTime)miLector["FechaNacimiento"];
                        }

                        listadoPersonas.Add(oPersona);
                    }
                }

                miLector.Close();
                miConexion.Close();
            }
            catch (SqlException exSql)
            {
                throw exSql;
            }

            return listadoPersonas.ToArray();
        }
    }
}
