/**
 * Guard funcional de administrador.
 *
 * Protege las rutas que solo deben ser accesibles por usuarios con el rol
 * 'administrador' (ej: gestión de usuarios). Si el usuario autenticado
 * no es administrador, redirige al menú de inicio (/home).
 *
 * Se usa en combinación con authGuard: primero se verifica la autenticación
 * y luego el rol de administrador.
 */

// #region Imports
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
// #endregion

// #region Guard
/**
 * Función guard que verifica que el usuario tiene rol de administrador.
 *
 * @returns true si el usuario es administrador, false si se redirige al inicio.
 */
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el usuario es administrador, permite el acceso
  if (authService.isAdmin()) {
    return true;
  }

  // Redirige al menú principal si no es administrador
  router.navigate(['/home']);
  return false;
};
// #endregion
