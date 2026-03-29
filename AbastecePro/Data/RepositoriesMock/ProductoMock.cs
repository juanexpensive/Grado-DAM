using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces.Repositories;

namespace Data.RepositoriesMock
{
    public class ProductoMock : IProductoRepository
    {
        private static readonly List<Producto> _productos = new List<Producto>
        {
            new Producto("Leche", "Leche entera 1L", 1.20m, 100, 1, 1, true) { Id = 1 },
            new Producto("Pan", "Pan de molde", 0.90m, 50, 1, 1, true) { Id = 2 },
            new Producto("Arroz", "Arroz bomba 1kg", 2.50m, 200, 2, 2, true) { Id = 3 }
        };

        public Task<bool> AddProducto(Producto producto)
        {
            producto.Id = _productos.Count > 0 ? _productos.Max(p => p.Id) + 1 : 1;
            _productos.Add(producto);
            return Task.FromResult(true);
        }

        public Task<bool> DeleteProducto(int id)
        {
            var producto = _productos.FirstOrDefault(p => p.Id == id);
            if (producto != null)
            {
                producto.Activo = false;
                return Task.FromResult(true);
            }
            return Task.FromResult(false);
        }

        public Task<Producto[]> GetAllProductos()
        {
            return Task.FromResult(_productos.Where(p => p.Activo).ToArray());
        }

        public Task<Producto> GetProductoById(int id)
        {
            return Task.FromResult(_productos.FirstOrDefault(p => p.Id == id && p.Activo));
        }

        public Task<bool> UpdateProducto(int id, Producto producto)
        {
            var existingProducto = _productos.FirstOrDefault(p => p.Id == id);
            if (existingProducto != null)
            {
                existingProducto.Nombre = producto.Nombre;
                existingProducto.Descripcion = producto.Descripcion;
                existingProducto.Precio = producto.Precio;
                existingProducto.Stock = producto.Stock;
                existingProducto.IdCategoria = producto.IdCategoria;
                existingProducto.IdEmpresaProveedora = producto.IdEmpresaProveedora;
                existingProducto.Activo = producto.Activo;
                return Task.FromResult(true);
            }
            return Task.FromResult(false);
        }
    }
}
