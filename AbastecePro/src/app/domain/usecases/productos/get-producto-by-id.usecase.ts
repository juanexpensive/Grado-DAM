/**
 * @fileoverview Caso de uso: Obtener un producto por su ID.
 * Busca y devuelve un producto específico del catálogo.
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
 * Caso de uso que busca un producto específico por su identificador.
 * Delega la consulta al repositorio de productos inyectado.
 */
@Injectable({ providedIn: 'root' })
export class GetProductoByIdUseCase {
  /** @param productoRepo Repositorio de productos inyectado por token */
  constructor(@Inject(PRODUCTO_REPOSITORY_TOKEN) private readonly productoRepo: IProductoRepository) {}

  /**
   * Ejecuta la búsqueda de un producto por su identificador.
   * @param id - Identificador único del producto
   * @returns Observable con el producto encontrado
   */
  execute(id: number): Observable<Producto> {
    return this.productoRepo.getById(id);
  }
}
// #endregion
