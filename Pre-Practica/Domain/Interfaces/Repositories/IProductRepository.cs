using Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    internal class IProductRepository
    {
        Task<List<ProductDTO>> ObtenerActivosAsync();
        Task<ProductDTO?> ObtenerPorIdAsync(int id);
    }
}
