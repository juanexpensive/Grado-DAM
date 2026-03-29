/**
 * @fileoverview Caso de uso: Cerrar sesión del usuario.
 * Elimina los datos del usuario actual del almacenamiento local (localStorage).
 */

// #region Imports
import { Injectable } from '@angular/core';
// #endregion

// #region Caso de Uso
/**
 * Caso de uso que ejecuta el cierre de sesión del usuario.
 * Elimina la información del usuario almacenada en localStorage.
 */
@Injectable({ providedIn: 'root' })
export class LogoutUsuarioUseCase {
  /**
   * Ejecuta el logout eliminando el usuario del localStorage.
   * No retorna valor ya que es una operación síncrona de limpieza.
   */
  execute(): void {
    localStorage.removeItem('currentUser');
  }
}
// #endregion
