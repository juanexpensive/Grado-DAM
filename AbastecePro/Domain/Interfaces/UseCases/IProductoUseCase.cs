using Domain.Entities;
using System.Threading.Tasks;

namespace Domain.Interfaces.UseCases
{
    public interface IProductoUseCase
    {
        Task<Producto[]> GetAllProductos();
        Task<Producto> GetProductoById(int id);
        Task<bool> AddProducto(Producto producto);
        Task<bool> UpdateProducto(int id, Producto producto);
        Task<bool> DeleteProducto(int id);
    }
}
