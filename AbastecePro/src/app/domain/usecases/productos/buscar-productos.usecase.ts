/**
 * @fileoverview Caso de uso: Buscar productos por texto.
 * Filtra productos cuyo nombre o descripción coincidan con el texto proporcionado.
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
 * Caso de uso que busca productos por texto libre.
 * Delega la búsqueda al repositorio de productos inyectado.
 */
@Injectable({ providedIn: 'root' })
export class BuscarProductosUseCase {
  /** @param productoRepo Repositorio de productos inyectado por token */
  constructor(@Inject(PRODUCTO_REPOSITORY_TOKEN) private readonly productoRepo: IProductoRepository) {}

  /**
   * Ejecuta la búsqueda de productos por texto libre.
   * @param texto - Texto de búsqueda para filtrar por nombre o descripción
   * @returns Observable con los productos que coinciden con el texto
   */
  execute(texto: string): Observable<Producto[]> {
    return this.productoRepo.buscar(texto);
  }
}
// #endregion
