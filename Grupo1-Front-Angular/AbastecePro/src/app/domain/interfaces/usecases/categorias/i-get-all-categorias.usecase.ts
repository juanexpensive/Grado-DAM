/**
 * @fileoverview Interfaz del caso de uso: Obtener todas las categorías.
 * Recupera la lista completa de categorías del catálogo de productos.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Categoria } from '../../../entities/categoria.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para obtener todas las categorías.
 */
export interface IGetAllCategoriasUseCase {
  /** Ejecuta la consulta de todas las categorías */
  execute(): Observable<Categoria[]>;
}
// #endregion
