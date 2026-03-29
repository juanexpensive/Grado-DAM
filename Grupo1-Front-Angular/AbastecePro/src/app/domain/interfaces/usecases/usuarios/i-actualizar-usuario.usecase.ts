/**
 * @fileoverview Interfaz del caso de uso: Actualizar un usuario existente.
 * Modifica los datos de un usuario ya registrado en el sistema.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Usuario } from '../../../entities/usuario.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para actualizar un usuario.
 */
export interface IActualizarUsuarioUseCase {
  /** Ejecuta la actualización de un usuario existente */
  execute(usuario: Usuario): Observable<Usuario>;
}
// #endregion
