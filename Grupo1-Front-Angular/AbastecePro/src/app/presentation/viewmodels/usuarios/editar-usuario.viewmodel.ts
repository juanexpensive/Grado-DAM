/**
 * ViewModel para editar un usuario existente.
 *
 * Permite cargar los datos actuales de un usuario desde la API,
 * modificarlos en el formulario y guardar los cambios.
 * Tras guardar exitosamente, redirige al listado de usuarios.
 */

// #region Imports
import { Injectable, Inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Usuario, RolUsuario } from '../../../domain/entities/usuario.entity';
import { IUsuarioRepository } from '../../../domain/interfaces/repositories/i-usuario.repository';
import { USUARIO_REPOSITORY_TOKEN } from '../../../di/types/injection.tokens';
// #endregion

@Injectable({ providedIn: 'root' })
export class EditarUsuarioViewModel {

  // #region Señales de estado
  /** Indica si se están cargando los datos del usuario */
  isLoading = signal(false);

  /** Indica si se está guardando la actualización del usuario */
  isSaving = signal(false);

  /** Mensaje de error en caso de fallo al cargar o guardar */
  errorMessage = signal<string | null>(null);

  /** Mensaje de éxito mostrado tras guardar correctamente */
  successMessage = signal<string | null>(null);
  // #endregion

  // #region Señales del formulario
  /** ID del usuario que se está editando */
  id = signal(0);

  /** Nombre del usuario */
  nombre = signal('');

  /** Apellidos del usuario */
  apellidos = signal('');

  /** Correo electrónico del usuario */
  correo = signal('');

  /** Contraseña del usuario (puede estar vacía si se gestiona vía Firebase) */
  password = signal('');

  /** Número de teléfono del usuario */
  telefono = signal('');

  /** Rol del usuario: 'administrador' o 'empleado' */
  rol = signal<RolUsuario>('empleado');

  /** ID de la empresa a la que pertenece el usuario */
  idEmpresa = signal(1);

  /** UID de Firebase Authentication asociado al usuario */
  firebaseUID = signal('');

  /** Indica si el usuario está activo o ha sido eliminado lógicamente */
  activo = signal(true);
  // #endregion

  // #region Constructor
  /**
   * @param usuarioRepo - Repositorio de usuarios inyectado vía token.
   * @param router - Router de Angular para navegar tras guardar.
   */
  constructor(
    @Inject(USUARIO_REPOSITORY_TOKEN) private readonly usuarioRepo: IUsuarioRepository,
    private readonly router: Router
  ) {}
  // #endregion

  // #region Métodos públicos
  /**
   * Carga los datos de un usuario existente desde la API y los asigna a las señales del formulario.
   *
   * @param id - ID del usuario a cargar.
   */
  cargarUsuario(id: number): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.usuarioRepo.getById(id)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (user) => {
          // Asigna cada campo del usuario a su señal correspondiente
          this.id.set(user.id);
          this.nombre.set(user.nombre);
          this.apellidos.set(user.apellidos ?? '');
          this.correo.set(user.correo);
          this.password.set(user.password ?? '');
          this.telefono.set(user.telefono);
          this.rol.set(user.rol);
          this.idEmpresa.set(user.idEmpresa ?? 1);
          this.firebaseUID.set(user.firebaseUID ?? '');
          this.activo.set(user.activo);
        },
        error: (err) => this.errorMessage.set(err.message || 'Error al cargar usuario.'),
      });
  }

  /**
   * Guarda los cambios realizados en el formulario de edición del usuario.
   *
   * Flujo:
   * 1. Construye la entidad Usuario a partir de las señales del formulario.
   * 2. Envía la actualización al repositorio (API REST).
   * 3. Muestra mensaje de éxito y redirige al listado de usuarios tras 1.2 segundos.
   */
  guardar(): void {
    this.isSaving.set(true);
    this.errorMessage.set(null);

    // Construye la entidad Usuario completa con los valores actuales del formulario
    const usuario: Usuario = {
      id: this.id(),
      nombre: this.nombre(),
      apellidos: this.apellidos(),
      correo: this.correo(),
      password: this.password(),
      telefono: this.telefono(),
      rol: this.rol(),
      idEmpresa: this.idEmpresa(),
      firebaseUID: this.firebaseUID(),
      activo: this.activo(),
    };

    this.usuarioRepo.update(usuario)
      .pipe(finalize(() => this.isSaving.set(false)))
      .subscribe({
        next: () => {
          this.successMessage.set('Usuario actualizado correctamente.');
          // Redirige al listado de usuarios tras un breve retraso para mostrar el mensaje
          setTimeout(() => this.router.navigate(['/usuarios']), 1200);
        },
        error: (err) => this.errorMessage.set(err.message || 'Error al actualizar usuario.'),
      });
  }
  // #endregion
}
