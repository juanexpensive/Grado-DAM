/**
 * @fileoverview Caso de uso: Filtrar productos por categoría.
 * Devuelve los productos que pertenecen a una categoría específica.
 */

// #region Imports
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../../entities/producto.entity';
import { IProductoRepository } from '../../interfaces/repositories/i-producto.repository';
import { PRODUCTO_REPOSITORY_TOKEN } from '../../../di/types/injection.tokens';
// #endregion

// #region Caso de Uso
/**
 * Caso de uso que filtra productos por su categoría.
 * Delega el filtrado al repositorio de productos inyectado.
 */
@Injectable({ providedIn: 'root' })
export class FiltrarProductosPorCategoriaUseCase {
  /** @param productoRepo Repositorio de productos inyectado por token */
  constructor(@Inject(PRODUCTO_REPOSITORY_TOKEN) private readonly productoRepo: IProductoRepository) {}

  /**
   * Ejecuta el filtrado de productos por ID de categoría.
   * @param idCategoria - Identificador de la categoría a filtrar
   * @returns Observable con los productos de la categoría indicada
   */
  execute(idCategoria: number): Observable<Producto[]> {
    return this.productoRepo.filtrarPorCategoria(idCategoria);
  }
}
// #endregion
