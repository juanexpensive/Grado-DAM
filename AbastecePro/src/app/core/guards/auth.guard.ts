/**
 * Guard funcional de autenticación.
 *
 * Protege las rutas que requieren un usuario autenticado.
 * Si el usuario no tiene una sesión activa, redirige automáticamente
 * a la pantalla de login (/login).
 *
 * Se usa en las rutas del módulo principal (app.routes.ts) mediante
 * la propiedad `canActivate: [authGuard]`.
 */

// #region Imports
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
// #endregion

// #region Guard
/**
 * Función guard que verifica la autenticación del usuario.
 *
 * @returns true si el usuario está autenticado, false si se redirige al login.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el usuario está autenticado, permite el acceso a la ruta
  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirige al login si no hay sesión activa
  router.navigate(['/login']);
  return false;
};
// #endregion
