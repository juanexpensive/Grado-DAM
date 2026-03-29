using Ejercicio_1.Models.Entities;

namespace Ejercicio_1.Models.DAL
{
    public class clsListadoDepartamento
    {
        private static List<clsDepartamento> lista = new List<clsDepartamento>
    {
        new clsDepartamento(1, "Juan Pérez"),
        new clsDepartamento(2, "María López"),
        new clsDepartamento(3, "Carlos García"),
        new clsDepartamento(4, "Lucía Fernández"),
        new clsDepartamento(5, "Miguel Torres"),
        new clsDepartamento(6, "Ana Martínez")
    };
        public static List<clsDepartamento> getListadoCompletoDepartamento()
        {
            return lista;
        }
    }
}
