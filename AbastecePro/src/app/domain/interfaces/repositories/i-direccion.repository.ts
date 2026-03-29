/**
 * @fileoverview Interfaz del repositorio de Direcciones.
 * Define el contrato CRUD para las direcciones de entrega.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Direccion } from '../../entities/direccion.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del repositorio de direcciones.
 * Define las operaciones CRUD disponibles sobre direcciones.
 */
export interface IDireccionRepository {
  /** Obtiene todas las direcciones */
  getAll(): Observable<Direccion[]>;

  /** Obtiene una dirección por su ID */
  getById(id: number): Observable<Direccion>;

  /** Crea una nueva dirección */
  create(direccion: Omit<Direccion, 'id'>): Observable<Direccion>;

  /** Actualiza una dirección existente */
  update(direccion: Direccion): Observable<Direccion>;

  /** Elimina una dirección por su ID */
  delete(id: number): Observable<boolean>;
}
// #endregion
