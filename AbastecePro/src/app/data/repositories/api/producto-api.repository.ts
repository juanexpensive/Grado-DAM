/**
 * Implementación API del repositorio de Productos.
 *
 * Conecta con el backend ASP.NET a través de la API REST para gestionar
 * el catálogo de productos del sistema.
 *
 * Nota: El endpoint GET /Producto/{id} del backend devuelve error 500,
 * por lo que getById() obtiene todos los productos y filtra localmente.
 */

// #region Imports
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { IProductoRepository } from '../../../domain/interfaces/repositories/i-producto.repository';
import { Producto } from '../../../domain/entities/producto.entity';
import { ApiConnectionService } from '../../datasources/api/api-connection.service';
import { ENDPOINTS } from '../../datasources/api/endpoints.constants';
// #endregion

@Injectable()
export class ProductoApiRepository implements IProductoRepository {

  // #region Constructor
  /**
   * @param api - Servicio de conexión a la API para realizar peticiones HTTP.
   */
  constructor(private readonly api: ApiConnectionService) {}
  // #endregion

  // #region Métodos públicos
  /**
   * Obtiene todos los productos desde la API.
   *
   * @returns Observable con la lista completa de productos.
   */
  getAll(): Observable<Producto[]> {
    return this.api.get<Producto[]>(ENDPOINTS.PRODUCTOS.BASE);
  }

  /**
   * Obtiene un producto por su ID.
   *
   * WORKAROUND: El endpoint GET /Producto/{id} del backend devuelve error 500,
   * por lo que se obtienen todos los productos y se filtra localmente.
   *
   * @param id - ID del producto a buscar.
   * @returns Observable con el producto encontrado.
   * @throws Error si no se encuentra el producto con el ID indicado.
   */
  getById(id: number): Observable<Producto> {
    return this.getAll().pipe(
      map(productos => {
        const producto = productos.find(p => p.id === id);
        if (!producto) throw new Error(`Producto con id ${id} no encontrado.`);
        return producto;
      })
    );
  }

  /**
   * Busca productos por texto en nombre o descripción.
   * La búsqueda no distingue mayúsculas/minúsculas.
   *
   * @param texto - Texto a buscar en nombre y descripción.
   * @returns Observable con los productos que coinciden con la búsqueda.
   */
  buscar(texto: string): Observable<Producto[]> {
    const lower = texto.toLowerCase();
    return this.getAll().pipe(
      map(productos =>
        productos.filter(
          p =>
            p.nombre.toLowerCase().includes(lower) ||
            p.descripcion.toLowerCase().includes(lower)
        )
      )
    );
  }

  /**
   * Filtra productos por categoría.
   *
   * @param idCategoria - ID de la categoría para filtrar.
   * @returns Observable con los productos de la categoría indicada.
   */
  filtrarPorCategoria(idCategoria: number): Observable<Producto[]> {
    return this.getAll().pipe(
      map(productos => productos.filter(p => p.idCategoria === idCategoria))
    );
  }

  /**
   * Crea un nuevo producto en el backend.
   *
   * @param producto - Datos del producto a crear (sin ID).
   * @returns Observable con el producto creado.
   */
  create(producto: Omit<Producto, 'id'>): Observable<Producto> {
    return this.api.post<any>(ENDPOINTS.PRODUCTOS.BASE, producto).pipe(
      map(raw => raw ? raw : producto as Producto)
    );
  }

  /**
   * Actualiza un producto existente en el backend.
   *
   * @param producto - Datos completos del producto con ID.
   * @returns Observable con el producto actualizado.
   */
  update(producto: Producto): Observable<Producto> {
    return this.api.put<any>(ENDPOINTS.PRODUCTOS.BY_ID(producto.id), producto).pipe(
      map(raw => raw ? raw : producto)
    );
  }

  /**
   * Elimina un producto por su ID.
   *
   * @param id - ID del producto a eliminar.
   * @returns Observable con true si se eliminó correctamente.
   */
  delete(id: number): Observable<boolean> {
    return this.api.delete<void>(ENDPOINTS.PRODUCTOS.BY_ID(id)).pipe(map(() => true));
  }
  // #endregion
}
