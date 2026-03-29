/**
 * @fileoverview Interfaz del repositorio de Categorías.
 * Define el contrato CRUD que deben implementar los repositorios de categorías.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Categoria } from '../../entities/categoria.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del repositorio de categorías.
 * Define las operaciones CRUD disponibles sobre categorías.
 */
export interface ICategoriaRepository {
  /** Obtiene todas las categorías */
  getAll(): Observable<Categoria[]>;

  /** Obtiene una categoría por su ID */
  getById(id: number): Observable<Categoria>;

  /** Crea una nueva categoría */
  create(categoria: Omit<Categoria, 'id'>): Observable<Categoria>;

  /** Actualiza una categoría existente */
  update(categoria: Categoria): Observable<Categoria>;
}
// #endregion
