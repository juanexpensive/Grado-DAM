using Domain.Entities;
using Domain.Interfaces.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Data.RepositoriesMock
{
    public class CategoriaMock : ICategoriaRepository
    {
        private static readonly List<Categoria> _categorias = new List<Categoria>
        {
            new Categoria("Bebidas") { Id = 1 },
            new Categoria("Alimentación") { Id = 2 },
            new Categoria("Limpieza") { Id = 3 },
            new Categoria("Higiene") { Id = 4 }
        };

        public Task<bool> AddCategoria(Categoria categoria)
        {
            categoria.Id = _categorias.Count > 0 ? _categorias.Max(c => c.Id) + 1 : 1;
            _categorias.Add(categoria);
            return Task.FromResult(true);
        }

        public Task<Categoria[]> GetAllCategorias()
        {
            return Task.FromResult(_categorias.Where(c => c.Activo).ToArray());
        }

        public Task<Categoria> GetCategoriaById(int id)
        {
            return Task.FromResult(_categorias.FirstOrDefault(c => c.Id == id && c.Activo));
        }

        public Task<bool> UpdateCategoria(int id, Categoria categoria)
        {
            var existingCategoria = _categorias.FirstOrDefault(c => c.Id == id);
            if (existingCategoria != null)
            {
                existingCategoria.Nombre = categoria.Nombre;
                existingCategoria.Activo = categoria.Activo;
                return Task.FromResult(true);
            }
            return Task.FromResult(false);
        }

        public Task<bool> DeleteCategoria(int id)
        {
            var existingCategoria = _categorias.FirstOrDefault(c => c.Id == id);
            if (existingCategoria != null)
            {
                existingCategoria.Activo = false;
                return Task.FromResult(true);
            }
            return Task.FromResult(false);
        }
    }
}
