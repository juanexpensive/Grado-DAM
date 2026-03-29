using System;
using System.Collections.Generic;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.Data.SqlClient;

namespace Data.Repositories
{
    public class PersonasRepositoryAzure : IListadoPersonasRepository
    {
        private SqlConnection miConexion = new SqlConnection();
        private List<Persona> listadoPersonas = new List<Persona>();
        private SqlCommand miComando = new SqlCommand();
        private SqlDataReader miLector;
        private Persona oPersona;

        public List<Persona> obtenerListadoPersonas()
        {
            // Establecemos la cadena de conexión
            miConexion.ConnectionString = "server=juancaro.database.windows.net;database=DDBB;uid=juan;pwd=abc12345!;trustServerCertificate=true;";

            try
            {
                // Abrimos la conexión a la base de datos
                miConexion.Open();

                // Creamos el comando para ejecutar la consulta
                miComando.CommandText = "SELECT * FROM personas";
                miComando.Connection = miConexion;

                // Ejecutamos la consulta y obtenemos el lector de datos
                miLector = miComando.ExecuteReader();

                // Si hay filas en el lector
                if (miLector.HasRows)
                {
                    // Leemos las filas
                    while (miLector.Read())
                    {
                        // Creamos una nueva instancia de Persona
                        oPersona = new Persona();

                        // Asignamos los valores a la instancia de Persona
                        oPersona.ID = (int)miLector["ID"];
                        oPersona.Nombre = (string)miLector["Nombre"];
                        oPersona.Apellidos = (string)miLector["Apellidos"];

                        // Si sospechamos que el campo puede ser Null en la base de datos
                        if (miLector["FechaNacimiento"] != DBNull.Value)
                        {
                            oPersona.FechaNacimiento = (DateTime)miLector["FechaNacimiento"];
                        }

                        oPersona.Direccion = (string)miLector["Direccion"];
                        oPersona.Telefono = (string)miLector["Telefono"];
                        oPersona.Foto = (string)miLector["Foto"];


                        // Añadimos la persona a la lista
                        listadoPersonas.Add(oPersona);
                    }
                }

                // Cerramos el lector y la conexión
                miLector.Close();
                miConexion.Close();
            }
            catch (SqlException exSql)
            {
                // En caso de error, lanzamos la excepción
                throw exSql;
            }

            // Devolvemos la lista de personas
            return listadoPersonas;
        }
    }
}