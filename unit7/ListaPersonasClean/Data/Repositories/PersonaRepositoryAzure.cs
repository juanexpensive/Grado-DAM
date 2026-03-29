using DOMAIN.UseCases.interfaces;
using DOMAIN.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Data.Repositories
{
    public class PersonaRepositoryAzure : IPeopleRepository
    {
        SqlConnection miConexion = new SqlConnection();

        List<clsPersona> listadoPersonas = new List<clsPersona>();

        SqlCommand miComando = new SqlCommand();

        SqlDataReader miLector;

        clsPersona oPersona;

        miConexion.ConnectionString
=("server=localhost;database=nombreBBDD;uid=prueba;pwd=123;trustServerCertificate=true;“

try

{

miConexion.Open();

//Creamos el comando (Creamos el comando, le pasamos la sentencia y la conexion, y
lo ejecutamos)

miComando.CommandText = "SELECT * FROM personas";

miComando.Connection = miConexion;

miLector = miComando.ExecuteReader();
    
//Si hay lineas en el lector

if (miLector.HasRows)

{

while (miLector.Read())

{

oPersona = new clsPersona();

        oPersona.id = (int) miLector["IDPersona"];

        oPersona.nombre = (string) miLector["nombre"];

        oPersona.apellidos = (string) miLector["apellidos"]

//Si sospechamos que el campo puede ser Null en la BBDD

if (miLector["fechaNac"] != System.DBNull.Value)

{oPersona.fechaNac = (DateTime) miLector["fechaNac"];
    }

    oPersona.direccion = (string) miLector["direccion"];

    oPersona.telefono = (string) miLector["telefono"];

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

return listadoPersonas;

}
}
}
