/**
 * ViewModel para el listado de usuarios (panel de administración).
 *
 * Gestiona la carga y visualización de los usuarios activos del sistema.
 * Solo los administradores pueden acceder a esta funcionalidad.
 * Filtra los usuarios eliminados (activo = false) para el listado de gestión.
 */

// #region Imports
import { Injectable, Inject, signal } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { Usuario } from '../../../domain/entities/usuario.entity';
import { IUsuarioRepository } from '../../../domain/interfaces/repositories/i-usuario.repository';
import { USUARIO_REPOSITORY_TOKEN } from '../../../di/types/injection.tokens';
import { UsuarioViewModel } from '../../models/usuario-view.model';
// #endregion

@Injectable({ providedIn: 'root' })
export class ListadoUsuariosViewModel {

  // #region Señales de estado
  /** Indica si se están cargando los usuarios desde la API */
  isLoading = signal(false);

  /** Mensaje de error en caso de fallo al cargar o eliminar usuarios */
  errorMessage = signal<string | null>(null);

  /** Lista de usuarios activos mapeados al modelo de vista */
  usuarios = signal<UsuarioViewModel[]>([]);
  // #endregion

  // #region Constructor
  /**
   * @param usuarioRepo - Repositorio de usuarios inyectado vía token de inyección de dependencias.
   */
  constructor(@Inject(USUARIO_REPOSITORY_TOKEN) private readonly usuarioRepo: IUsuarioRepository) {}
  // #endregion

  // #region Métodos públicos
  /**
   * Carga todos los usuarios activos desde la API.
   *
   * Flujo:
   * 1. Obtiene todos los usuarios del repositorio.
   * 2. Filtra solo los usuarios con activo = true (excluye los eliminados lógicamente).
   * 3. Mapea cada usuario al modelo de vista para su presentación en la UI.
   *
   * Nota: Este filtro es exclusivo del listado de gestión de usuarios.
   * Los pedidos siguen mostrando la información de usuarios eliminados.
   */
  cargarUsuarios(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.usuarioRepo.getAll()
      .pipe(
        // Filtra usuarios activos y mapea al modelo de vista
        map(users => users.filter(u => u.activo).map(u => this.mapToViewModel(u))),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (data) => this.usuarios.set(data),
        error: (err) => this.errorMessage.set(err.message || 'Error al cargar usuarios.'),
      });
  }

  /**
   * Elimina un usuario del sistema por su ID.
   *
   * Tras la eliminación exitosa, recarga la lista de usuarios automáticamente.
   *
   * @param id - ID del usuario a eliminar.
   */
  eliminarUsuario(id: number): void {
    this.usuarioRepo.delete(id).subscribe({
      next: () => this.cargarUsuarios(),
      error: (err) => this.errorMessage.set(err.message || 'Error al eliminar usuario.'),
    });
  }
  // #endregion

  // #region Métodos privados
  /**
   * Convierte una entidad Usuario del dominio al modelo de vista UsuarioViewModel.
   *
   * Genera el nombre completo concatenando nombre y apellidos,
   * y calcula las iniciales del usuario para mostrar en avatares.
   *
   * @param u - Entidad Usuario del dominio.
   * @returns Objeto UsuarioViewModel con los datos formateados para la vista.
   */
  private mapToViewModel(u: Usuario): UsuarioViewModel {
    return {
      id: u.id,
      nombreCompleto: `${u.nombre} ${u.apellidos}`,
      correo: u.correo,
      telefono: u.telefono,
      rol: u.rol,
      iniciales: `${u.nombre.charAt(0)}${u.apellidos.charAt(0)}`.toUpperCase(),
    };
  }
  // #endregion
}
