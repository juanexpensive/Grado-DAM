using Domain.Entities;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.UseCases;
using System.Threading.Tasks;

namespace Domain.UseCases
{
    public class ProductoUseCase : IProductoUseCase
    {
        private readonly IProductoRepository _productoRepository;

        public ProductoUseCase(IProductoRepository productoRepository)
        {
            _productoRepository = productoRepository;
        }

        /// <summary>
        /// Obtiene todos los productos llamando al repositorio.
        /// Precondiciones: El repositorio debe estar inyectado y funcional.
        /// Postcondiciones: Retorna una tarea con el arreglo de productos.
        /// </summary>
        public Task<Producto[]> GetAllProductos()
        {
            return _productoRepository.GetAllProductos();
        }

        /// <summary>
        /// Obtiene un producto por su ID llamando al repositorio.
        /// Precondiciones: El ID debe ser válido.
        /// Postcondiciones: Retorna una tarea con el producto encontrado o null.
        /// </summary>
        public Task<Producto> GetProductoById(int id)
        {
            return _productoRepository.GetProductoById(id);
        }

        /// <summary>
        /// Registra un nuevo producto a través del repositorio.
        /// Precondiciones: El objeto producto debe ser válido.
        /// Postcondiciones: Retorna una tarea con el resultado booleano de la operación.
        /// </summary>
        public Task<bool> AddProducto(Producto producto)
        {
            return _productoRepository.AddProducto(producto);
        }

        /// <summary>
        /// Actualiza un producto existente a través del repositorio.
        /// Precondiciones: El ID debe existir y el producto ser válido.
        /// Postcondiciones: Retorna una tarea con el resultado booleano de la actualización.
        /// </summary>
        public Task<bool> UpdateProducto(int id, Producto producto)
        {
            return _productoRepository.UpdateProducto(id, producto);
        }

        /// <summary>
        /// Elimina un producto por su ID a través del repositorio.
        /// Precondiciones: El ID debe existir.
        /// Postcondiciones: Retorna una tarea con el resultado booleano de la eliminación.
        /// </summary>
        public Task<bool> DeleteProducto(int id)
        {
            return _productoRepository.DeleteProducto(id);
        }
    }
}
