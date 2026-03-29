using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data;
using Domain.DTOs;


namespace Data.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<ProductDTO>> ObtenerActivosAsync()
        {
            return await _context.Products
                .Where(p => p.Active)  // LINQ → se traduce a SQL
                .Select(p => new ProductDTO
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price
                })
                .ToListAsync(); // Ejecuta la consulta
        }

        // Devuelve un producto por Id
        public async Task<ProductDTO?> ObtenerPorIdAsync(int id)
        {
            var producto = await _context.Products.FindAsync(id); // Busca por PK

            if (producto == null)
                return null; // Manejo de nul

            // Mapeo a DTO
            return new ProductDTO
            {
                Id = producto.Id,
                Name = producto.Name,
                Price = producto.Price
            };
        }
    }
}