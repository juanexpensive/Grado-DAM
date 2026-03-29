/**
 * ViewModel para crear un nuevo usuario.
 *
 * Gestiona el flujo completo de creación de usuario en dos pasos:
 * 1. Crea el usuario en Firebase Authentication (autenticación).
 * 2. Guarda los datos del usuario en la API REST (datos de negocio).
 *
 * Si el paso 2 falla, se realiza un rollback eliminando el usuario de Firebase
 * para mantener la consistencia entre ambos sistemas.
 */

// #region Imports
import { Injectable, Inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { from, switchMap, throwError } from 'rxjs';
import { IUsuarioRepository } from '../../../domain/interfaces/repositories/i-usuario.repository';
import { USUARIO_REPOSITORY_TOKEN } from '../../../di/types/injection.tokens';
import { RolUsuario } from '../../../domain/entities/usuario.entity';
import { FirebaseService } from '../../../core/services/firebase.service';
// #endregion

@Injectable({ providedIn: 'root' })
export class CrearUsuarioViewModel {

  // #region Señales de estado
  /** Indica si se está cargando información (reservado para uso futuro) */
  isLoading = signal(false);

  /** Indica si se está procesando la creación del usuario */
  isSaving = signal(false);

  /** Mensaje de error en caso de fallo en la creación */
  errorMessage = signal<string | null>(null);

  /** Mensaje de éxito mostrado tras crear correctamente el usuario */
  successMessage = signal<string | null>(null);
  // #endregion

  // #region Señales del formulario
  /** Nombre del nuevo usuario */
  nombre = signal('');

  /** Apellidos del nuevo usuario */
  apellidos = signal('');

  /** Correo electrónico del nuevo usuario (se usa también para Firebase Auth) */
  correo = signal('');

  /** Contraseña para Firebase Authentication (mínimo 6 caracteres) */
  password = signal('');

  /** Número de teléfono del nuevo usuario */
  telefono = signal('');

  /** Rol asignado al nuevo usuario: 'administrador' o 'empleado' */
  rol = signal<RolUsuario>('empleado');
  // #endregion

  // #region Constructor
  /**
   * @param usuarioRepo - Repositorio de usuarios para guardar en la API REST.
   * @param router - Router de Angular para navegar tras la creación exitosa.
   * @param firebaseService - Servicio de Firebase para crear la cuenta de autenticación.
   */
  constructor(
    @Inject(USUARIO_REPOSITORY_TOKEN) private readonly usuarioRepo: IUsuarioRepository,
    private readonly router: Router,
    private readonly firebaseService: FirebaseService
  ) {}
  // #endregion

  // #region Métodos públicos
  /**
   * Ejecuta el proceso de creación de un nuevo usuario.
   *
   * Flujo completo:
   * 1. Crea el usuario en Firebase Auth con correo y contraseña.
   * 2. Si Firebase es exitoso, guarda los datos del usuario en la API REST
   *    incluyendo el firebaseUID obtenido.
   * 3. Si la API falla (paso 2), hace rollback eliminando el usuario de Firebase
   *    para evitar inconsistencias.
   * 4. Muestra mensaje de éxito y redirige al listado de usuarios tras 1.5 segundos.
   */
  crear(): void {
    this.isSaving.set(true);
    this.errorMessage.set(null);

    const correo = this.correo();
    const password = this.password();

    // Paso 1: Crear usuario en Firebase Auth
    from(this.firebaseService.createUser(correo, password)).pipe(
      // Paso 2: Guardar en la API REST con el UID de Firebase
      switchMap(credential =>
        this.usuarioRepo.create({
          nombre: this.nombre(),
          apellidos: this.apellidos(),
          correo,
          password: '',  // La contraseña no se almacena en la API (se gestiona en Firebase)
          telefono: this.telefono(),
          rol: this.rol(),
          idEmpresa: 1,
          firebaseUID: credential.user.uid,
          activo: true,
        }).pipe(
          // Rollback: Si la API falla, elimina el usuario de Firebase para mantener consistencia
          catchError(apiError =>
            from(this.firebaseService.deleteUser(correo, password)).pipe(
              switchMap(() => throwError(() => apiError)),
              catchError(() => throwError(() => apiError))
            )
          )
        )
      ),
      finalize(() => this.isSaving.set(false))
    )
    .subscribe({
      next: () => {
        this.successMessage.set('Usuario creado correctamente.');
        // Redirige al listado de usuarios tras un breve retraso
        setTimeout(() => this.router.navigate(['/usuarios']), 1500);
      },
      error: (err) => {
        // Intenta traducir el error de Firebase; si no, usa el mensaje genérico
        const msg = this.mapFirebaseError(err?.code) || err.message || 'Error al crear usuario.';
        this.errorMessage.set(msg);
      },
    });
  }

  /**
   * Resetea todas las señales del formulario y los mensajes de estado.
   * Se utiliza al salir de la pantalla o al preparar una nueva creación.
   */
  reset(): void {
    this.nombre.set('');
    this.apellidos.set('');
    this.correo.set('');
    this.password.set('');
    this.telefono.set('');
    this.rol.set('empleado');
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }
  // #endregion

  // #region Métodos privados
  /**
   * Traduce los códigos de error de Firebase Authentication a mensajes comprensibles en español.
   *
   * @param code - Código de error de Firebase (ej: 'auth/email-already-in-use').
   * @returns Mensaje traducido en español, o null si el código no es reconocido.
   */
  private mapFirebaseError(code: string | undefined): string | null {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Ya existe una cuenta con ese correo electrónico.';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      default:
        return null;
    }
  }
  // #endregion
}
