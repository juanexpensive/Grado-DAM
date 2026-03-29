/**
 * @fileoverview Interfaz del caso de uso: Eliminar un usuario.
 * Elimina un usuario del sistema según su identificador.
 */

// #region Imports
import { Observable } from 'rxjs';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para eliminar un usuario.
 */
export interface IEliminarUsuarioUseCase {
  /** Ejecuta la eliminación de un usuario por su identificador */
  execute(id: number): Observable<boolean>;
}
// #endregion
