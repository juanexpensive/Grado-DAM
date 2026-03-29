/**
 * @fileoverview Interfaz del caso de uso: Filtrar productos por categoría.
 * Recupera los productos que pertenecen a una categoría específica.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Producto } from '../../../entities/producto.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para filtrar productos por categoría.
 */
export interface IFiltrarProductosPorCategoriaUseCase {
  /** Ejecuta el filtrado de productos por el identificador de categoría */
  execute(idCategoria: number): Observable<Producto[]>;
}
// #endregion
