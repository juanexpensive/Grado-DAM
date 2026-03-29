using Domain.Interfaces.Repositories;

using Domain.Interfaces.UseCases;

using Domain.Entities;

using System.Threading.Tasks;



namespace Domain.UseCases

{

    public class UsuarioUseCase : IUsuarioUseCase

    {

        private readonly IUsuarioRepository _usuarioRepository;



        public UsuarioUseCase(IUsuarioRepository usuarioRepository)

        {

            _usuarioRepository = usuarioRepository;

        }



        /// <summary>
        /// Obtiene todos los usuarios a través del repositorio.
        /// Precondiciones: El repositorio debe estar inyectado.
        /// Postcondiciones: Retorna una tarea con la lista de usuarios.
        /// </summary>
        public Task<Usuario[]> GetAllUsuarios()

        {

            return _usuarioRepository.GetAllUsuarios();

        }



        /// <summary>
        /// Obtiene un usuario por su ID a través del repositorio.
        /// Precondiciones: El ID debe ser válido.
        /// Postcondiciones: Retorna una tarea con el usuario encontrado o null.
        /// </summary>
        public Task<Usuario> GetUsuarioById(int id)

        {

            return _usuarioRepository.GetUsuarioById(id);

        }



        /// <summary>
        /// Registra un nuevo usuario a través del repositorio.
        /// Precondiciones: El objeto usuario debe ser válido.
        /// Postcondiciones: Retorna una tarea con el resultado booleano del registro.
        /// </summary>
        public Task<bool> AddUsuario(Usuario usuario)

        {

            return _usuarioRepository.AddUsuario(usuario);

        }



        /// <summary>
        /// Actualiza un usuario existente a través del repositorio.
        /// Precondiciones: El ID debe existir y los datos del usuario ser válidos.
        /// Postcondiciones: Retorna una tarea con el resultado booleano de la actualización.
        /// </summary>
        public Task<bool> UpdateUsuario(int id, Usuario usuario)

        {

            return _usuarioRepository.UpdateUsuario(id, usuario);

        }



        /// <summary>
        /// Elimina un usuario por su ID a través del repositorio.
        /// Precondiciones: El ID debe existir.
        /// Postcondiciones: Retorna una tarea con el resultado booleano de la eliminación.
        /// </summary>
        public Task<bool> DeleteUsuario(int id)

        {

            return _usuarioRepository.DeleteUsuario(id);

        }

    }

}