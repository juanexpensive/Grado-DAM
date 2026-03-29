/**
 * @fileoverview Interfaz del caso de uso: Obtener todos los usuarios.
 * Recupera la lista completa de usuarios registrados en el sistema.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Usuario } from '../../../entities/usuario.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para obtener todos los usuarios.
 */
export interface IGetAllUsuariosUseCase {
  /** Ejecuta la consulta de todos los usuarios */
  execute(): Observable<Usuario[]>;
}
// #endregion
