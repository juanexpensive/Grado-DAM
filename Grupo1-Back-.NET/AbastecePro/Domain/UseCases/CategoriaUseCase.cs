using Domain.Entities;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.UseCases;
using System.Threading.Tasks;

namespace Domain.UseCases
{
    public class CategoriaUseCase : ICategoriaUseCase
    {
        private readonly ICategoriaRepository _categoriaRepository;

        public CategoriaUseCase(ICategoriaRepository categoriaRepository)
        {
            _categoriaRepository = categoriaRepository;
        }

        /// <summary>
        /// Obtiene todas las categorías llamando al repositorio.
        /// Precondiciones: El repositorio debe estar inyectado.
        /// Postcondiciones: Retorna una tarea con el arreglo de categorías.
        /// </summary>
        public Task<Categoria[]> GetAllCategorias()
        {
            return _categoriaRepository.GetAllCategorias();
        }

        /// <summary>
        /// Obtiene una categoría por su ID llamando al repositorio.
        /// Precondiciones: El ID debe ser válido.
        /// Postcondiciones: Retorna una tarea con la categoría encontrada o null.
        /// </summary>
        public Task<Categoria> GetCategoriaById(int id)
        {
            return _categoriaRepository.GetCategoriaById(id);
        }

        /// <summary>
        /// Agrega una nueva categoría llamando al repositorio.
        /// Precondiciones: El objeto categoría debe ser válido.
        /// Postcondiciones: Retorna una tarea con el resultado booleano.
        /// </summary>
        public Task<bool> AddCategoria(Categoria categoria)
        {
            return _categoriaRepository.AddCategoria(categoria);
        }

        /// <summary>
        /// Actualiza una categoría existente llamando al repositorio.
        /// Precondiciones: El ID debe existir y la categoría ser válida.
        /// Postcondiciones: Retorna una tarea con el resultado booleano.
        /// </summary>
        public Task<bool> UpdateCategoria(int id, Categoria categoria)
        {
            return _categoriaRepository.UpdateCategoria(id, categoria);
        }

        /// <summary>
        /// Elimina una categoría por su ID llamando al repositorio.
        /// Precondiciones: El ID debe existir.
        /// Postcondiciones: Retorna una tarea con el resultado booleano.
        /// </summary>
        public Task<bool> DeleteCategoria(int id)
        {
            return _categoriaRepository.DeleteCategoria(id);
        }
    }
}
