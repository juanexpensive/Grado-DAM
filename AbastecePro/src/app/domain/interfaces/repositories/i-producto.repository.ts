/**
 * @fileoverview Interfaz del repositorio de Productos.
 * Define operaciones CRUD y de búsqueda sobre el catálogo de productos.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Producto } from '../../entities/producto.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del repositorio de productos.
 * Define operaciones CRUD, búsqueda por texto
 * y filtrado por categoría.
 */
export interface IProductoRepository {
  /** Obtiene todos los productos */
  getAll(): Observable<Producto[]>;

  /** Obtiene un producto por su ID */
  getById(id: number): Observable<Producto>;

  /** Busca productos por texto en nombre o descripción */
  buscar(texto: string): Observable<Producto[]>;

  /** Filtra productos por ID de categoría */
  filtrarPorCategoria(idCategoria: number): Observable<Producto[]>;

  /** Crea un nuevo producto */
  create(producto: Omit<Producto, 'id'>): Observable<Producto>;

  /** Actualiza un producto existente */
  update(producto: Producto): Observable<Producto>;

  /** Elimina un producto por su ID */
  delete(id: number): Observable<boolean>;
}
// #endregion
