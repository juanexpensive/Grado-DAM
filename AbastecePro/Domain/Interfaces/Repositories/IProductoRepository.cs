using Domain.Entities;

using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    public interface IProductoRepository
    {
        Task<Producto[]> GetAllProductos();
        Task<Producto> GetProductoById(int id);
        Task<bool> AddProducto(Producto producto);
        Task<bool> UpdateProducto(int id, Producto producto);
        Task<bool> DeleteProducto(int id);
        
    }
}
