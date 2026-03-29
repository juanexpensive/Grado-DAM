/**
 * @fileoverview Interfaz del repositorio de Empresas.
 * Define el contrato CRUD para las empresas proveedoras/consumidoras.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Empresa } from '../../entities/empresa.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del repositorio de empresas.
 * Define las operaciones CRUD disponibles sobre empresas.
 */
export interface IEmpresaRepository {
  /** Obtiene todas las empresas */
  getAll(): Observable<Empresa[]>;

  /** Obtiene una empresa por su ID */
  getById(id: number): Observable<Empresa>;

  /** Crea una nueva empresa */
  create(empresa: Omit<Empresa, 'id'>): Observable<Empresa>;

  /** Actualiza una empresa existente */
  update(empresa: Empresa): Observable<Empresa>;

  /** Elimina una empresa por su ID */
  delete(id: number): Observable<boolean>;
}
// #endregion
