/**
 * @fileoverview Caso de uso: Obtener todas las categorías de productos.
 * Devuelve la lista completa de categorías disponibles en el catálogo.
 */

// #region Imports
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../../entities/categoria.entity';
import { ICategoriaRepository } from '../../interfaces/repositories/i-categoria.repository';
import { CATEGORIA_REPOSITORY_TOKEN } from '../../../di/types/injection.tokens';
// #endregion

// #region Caso de Uso
/**
 * Caso de uso que recupera todas las categorías del catálogo.
 * Delega la consulta al repositorio de categorías inyectado.
 */
@Injectable({ providedIn: 'root' })
export class GetAllCategoriasUseCase {
  /** @param categoriaRepo Repositorio de categorías inyectado por token */
  constructor(@Inject(CATEGORIA_REPOSITORY_TOKEN) private readonly categoriaRepo: ICategoriaRepository) {}

  /**
   * Ejecuta la obtención de todas las categorías.
   * @returns Observable con el listado completo de categorías
   */
  execute(): Observable<Categoria[]> {
    return this.categoriaRepo.getAll();
  }
}
// #endregion
