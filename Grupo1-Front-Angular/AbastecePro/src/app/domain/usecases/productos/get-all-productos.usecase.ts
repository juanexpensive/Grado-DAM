/**
 * @fileoverview Caso de uso: Obtener todos los productos del catálogo.
 * Devuelve la lista completa de productos disponibles.
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
 * Caso de uso que recupera todos los productos del catálogo.
 * Delega la consulta al repositorio de productos inyectado.
 */
@Injectable({ providedIn: 'root' })
export class GetAllProductosUseCase {
  /** @param productoRepo Repositorio de productos inyectado por token */
  constructor(@Inject(PRODUCTO_REPOSITORY_TOKEN) private readonly productoRepo: IProductoRepository) {}

  /**
   * Ejecuta la obtención de todos los productos.
   * @returns Observable con el listado completo de productos
   */
  execute(): Observable<Producto[]> {
    return this.productoRepo.getAll();
  }
}
// #endregion
