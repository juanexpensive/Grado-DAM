/**
 * ViewModel para la pantalla de Login.
 *
 * Gestiona el estado del formulario de inicio de sesión, incluyendo
 * la validación del formulario, la comunicación con el servicio de autenticación
 * y la navegación tras un login exitoso.
 */

// #region Imports
import { Injectable, signal, computed } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
// #endregion

@Injectable({ providedIn: 'root' })
export class LoginViewModel {

  // #region Señales de estado
  /** Indica si se está procesando el inicio de sesión */
  isLoading = signal(false);

  /** Mensaje de error mostrado al usuario en caso de fallo en el login */
  errorMessage = signal<string | null>(null);

  /** Correo electrónico introducido por el usuario en el formulario */
  correo = signal('');

  /** Contraseña introducida por el usuario en el formulario */
  password = signal('');
  // #endregion

  // #region Señales computadas
  /**
   * Señal computada que indica si el formulario es válido.
   * Requiere que tanto el correo como la contraseña tengan contenido.
   *
   * @returns true si ambos campos tienen al menos un carácter.
   */
  isFormValid = computed(() => this.correo().length > 0 && this.password().length > 0);
  // #endregion

  // #region Constructor
  /**
   * @param authService - Servicio de autenticación para gestionar el login con Firebase y la API.
   * @param router - Router de Angular para navegar tras un login exitoso.
   */
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  // #endregion

  // #region Métodos públicos
  /**
   * Ejecuta el proceso de inicio de sesión.
   *
   * Flujo:
   * 1. Valida que el formulario sea válido (correo y contraseña no vacíos).
   * 2. Activa el estado de carga y limpia errores previos.
   * 3. Llama al servicio de autenticación con las credenciales.
   * 4. Si el login es exitoso, navega a la pantalla principal (/home).
   * 5. Si las credenciales son incorrectas o hay un error, muestra el mensaje correspondiente.
   */
  login(): void {
    if (!this.isFormValid()) return;
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.login(this.correo(), this.password())
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (user) => {
          if (user) {
            // Login exitoso — redirige al menú principal
            this.router.navigate(['/home']);
          } else {
            // No se encontró el usuario en la API
            this.errorMessage.set('Credenciales incorrectas. Verifica tu correo y contraseña.');
          }
        },
        error: (err) => {
          // Error de Firebase o de la API
          this.errorMessage.set(err.message || 'Error al iniciar sesión.');
        },
      });
  }

  /**
   * Limpia (resetea) el estado completo del viewmodel.
   * Se utiliza al salir de la pantalla de login para evitar que queden datos residuales.
   */
  reset(): void {
    this.correo.set('');
    this.password.set('');
    this.errorMessage.set(null);
    this.isLoading.set(false);
  }
  // #endregion
}
