/**
 * @fileoverview Caso de uso: Obtener el usuario actualmente autenticado.
 * Lee los datos del usuario desde el almacenamiento local (localStorage).
 */

// #region Imports
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../../entities/usuario.entity';
// #endregion

// #region Caso de Uso
/**
 * Caso de uso que recupera el usuario en sesión desde localStorage.
 * No depende de ningún repositorio externo.
 */
@Injectable({ providedIn: 'root' })
export class GetCurrentUserUseCase {
  /**
   * Ejecuta la obtención del usuario actual desde localStorage.
   * @returns Observable con el usuario actual o null si no hay sesión activa
   */
  execute(): Observable<Usuario | null> {
    const data = localStorage.getItem('currentUser');
    if (!data) {
      return of(null);
    }
    return of(JSON.parse(data) as Usuario);
  }
}
// #endregion
