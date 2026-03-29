/**
 * Implementación API del repositorio de Categorías.
 *
 * Conecta con el backend ASP.NET a través de la API REST para realizar
 * operaciones CRUD sobre las categorías de productos.
 * Implementa la interfaz ICategoriaRepository definida en el dominio.
 */

// #region Imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICategoriaRepository } from '../../../domain/interfaces/repositories/i-categoria.repository';
import { Categoria } from '../../../domain/entities/categoria.entity';
import { ApiConnectionService } from '../../datasources/api/api-connection.service';
import { ENDPOINTS } from '../../datasources/api/endpoints.constants';
// #endregion

@Injectable()
export class CategoriaApiRepository implements ICategoriaRepository {

  // #region Constructor
  /**
   * @param api - Servicio de conexión a la API para realizar peticiones HTTP.
   */
  constructor(private readonly api: ApiConnectionService) {}
  // #endregion

  // #region Métodos públicos
  /**
   * Obtiene todas las categorías desde la API.
   *
   * @returns Observable con la lista completa de categorías.
   */
  getAll(): Observable<Categoria[]> {
    return this.api.get<Categoria[]>(ENDPOINTS.CATEGORIAS.BASE);
  }

  /**
   * Obtiene una categoría por su identificador.
   *
   * @param id - ID de la categoría a buscar.
   * @returns Observable con la categoría encontrada.
   */
  getById(id: number): Observable<Categoria> {
    return this.api.get<Categoria>(ENDPOINTS.CATEGORIAS.BY_ID(id));
  }

  /**
   * Crea una nueva categoría en el backend.
   *
   * @param categoria - Datos de la categoría a crear (sin ID, lo genera el backend).
   * @returns Observable con la categoría creada incluyendo su ID generado.
   */
  create(categoria: Omit<Categoria, 'id'>): Observable<Categoria> {
    return this.api.post<Categoria>(ENDPOINTS.CATEGORIAS.BASE, categoria);
  }

  /**
   * Actualiza una categoría existente en el backend.
   *
   * @param categoria - Datos completos de la categoría con ID.
   * @returns Observable con la categoría actualizada.
   */
  update(categoria: Categoria): Observable<Categoria> {
    return this.api.put<Categoria>(ENDPOINTS.CATEGORIAS.BY_ID(categoria.id), categoria);
  }
  // #endregion
}
