/**
 * @fileoverview Interfaz del caso de uso: Obtener un usuario por su ID.
 * Busca y devuelve un usuario específico según su identificador.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Usuario } from '../../../entities/usuario.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para obtener un usuario por su ID.
 */
export interface IGetUsuarioByIdUseCase {
  /** Ejecuta la búsqueda de un usuario por su identificador */
  execute(id: number): Observable<Usuario>;
}
// #endregion
