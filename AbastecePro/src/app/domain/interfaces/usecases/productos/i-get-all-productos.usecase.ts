/**
 * @fileoverview Interfaz del caso de uso: Obtener todos los productos.
 * Recupera la lista completa de productos disponibles en el catálogo.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Producto } from '../../../entities/producto.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para obtener todos los productos.
 */
export interface IGetAllProductosUseCase {
  /** Ejecuta la consulta de todos los productos */
  execute(): Observable<Producto[]>;
}
// #endregion
