using Domain.Entities;
using Domain.Interfaces;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class DepartamentoRepositoryAzure : IListadoDepartamentoRepository
    {
        private SqlConnection miConexion = new SqlConnection();
        private List<Departamento> ListadoDepartamento = new List<Departamento>();
        private SqlCommand miComando = new SqlCommand();
        private SqlDataReader miLector;
        private Departamento oDepartamento;

        public List<Departamento> obtenerListadoDepartamento()
        {
            miConexion.ConnectionString = "server=juancaro.database.windows.net;database=DDBB;uid=juan;pwd=abc12345!;trustServerCertificate=true;";

            try
            {
                miConexion.Open();
                miComando.CommandText = "SELECT * FROM Departamentos"; // Asegúrate del nombre real de la tabla
                miComando.Connection = miConexion;

                miLector = miComando.ExecuteReader();

                if (miLector.HasRows)
                {
                    while (miLector.Read())
                    {
                        oDepartamento = new Departamento();

                        oDepartamento.ID = (int)miLector["ID"];       // Debe coincidir con el nombre de columna real
                        oDepartamento.Nombre = (string)miLector["Nombre"];

                        ListadoDepartamento.Add(oDepartamento);
                    }
                }

                miLector.Close();
                miConexion.Close();
            }
            catch (SqlException exSql)
            {
                throw exSql;
            }

            return ListadoDepartamento;
        }

    }
}