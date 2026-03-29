using Ejercicio_1.Models.Entities;

namespace Ejercicio_1.Models.DAL
{
    public class clsListadoPersonas
    {
        private static List<clsPersona> lista = new List<clsPersona>
    {
        new clsPersona(1, "Juan Pérez"),
        new clsPersona(2, "María López"),
        new clsPersona(3, "Carlos García"),
        new clsPersona(4, "Lucía Fernández"),
        new clsPersona(5, "Miguel Torres"),
        new clsPersona(6, "Ana Martínez")
    };

        public static List<clsPersona> getListadoCompletoPersonas()
        {
            return lista;
        }

        public static clsPersona getListadoPersonaTercera()
        {
            return lista[2];
        }
    }

        
    }
