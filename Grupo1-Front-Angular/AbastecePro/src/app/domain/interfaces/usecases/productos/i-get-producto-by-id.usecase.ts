/**
 * @fileoverview Interfaz del caso de uso: Obtener un producto por su ID.
 * Busca y devuelve un producto específico según su identificador.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Producto } from '../../../entities/producto.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para obtener un producto por su ID.
 */
export interface IGetProductoByIdUseCase {
  /** Ejecuta la búsqueda de un producto por su identificador */
  execute(id: number): Observable<Producto>;
}
// #endregion
