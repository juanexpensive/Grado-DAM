/**
 * @fileoverview Interfaz del caso de uso: Buscar productos por texto.
 * Filtra los productos cuyo nombre o descripción coincida con el texto de búsqueda.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Producto } from '../../../entities/producto.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para buscar productos por texto.
 */
export interface IBuscarProductosUseCase {
  /** Ejecuta la búsqueda de productos por texto */
  execute(texto: string): Observable<Producto[]>;
}
// #endregion
