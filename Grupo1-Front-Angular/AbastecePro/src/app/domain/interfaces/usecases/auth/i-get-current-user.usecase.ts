/**
 * @fileoverview Interfaz del caso de uso: Obtener el usuario actualmente autenticado.
 * Devuelve el usuario en sesión o null si no hay sesión activa.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Usuario } from '../../../entities/usuario.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para obtener el usuario actual.
 */
export interface IGetCurrentUserUseCase {
  /** Ejecuta la obtención del usuario actual */
  execute(): Observable<Usuario | null>;
}
// #endregion
