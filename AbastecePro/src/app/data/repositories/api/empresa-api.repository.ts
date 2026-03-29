/**
 * Implementación API del repositorio de Empresas proveedoras.
 *
 * Conecta con el backend ASP.NET a través de la API REST para gestionar
 * las empresas proveedoras de productos del sistema.
 * Implementa la interfaz IEmpresaRepository definida en el dominio.
 */

// #region Imports
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { IEmpresaRepository } from '../../../domain/interfaces/repositories/i-empresa.repository';
import { Empresa } from '../../../domain/entities/empresa.entity';
import { ApiConnectionService } from '../../datasources/api/api-connection.service';
import { ENDPOINTS } from '../../datasources/api/endpoints.constants';
// #endregion

@Injectable()
export class EmpresaApiRepository implements IEmpresaRepository {

  // #region Constructor
  /**
   * @param api - Servicio de conexión a la API para realizar peticiones HTTP.
   */
  constructor(private readonly api: ApiConnectionService) {}
  // #endregion

  // #region Métodos públicos
  /**
   * Obtiene todas las empresas proveedoras desde la API.
   *
   * @returns Observable con la lista completa de empresas.
   */
  getAll(): Observable<Empresa[]> {
    return this.api.get<Empresa[]>(ENDPOINTS.EMPRESAS.BASE);
  }

  /**
   * Obtiene una empresa por su identificador.
   *
   * @param id - ID de la empresa a buscar.
   * @returns Observable con la empresa encontrada.
   */
  getById(id: number): Observable<Empresa> {
    return this.api.get<Empresa>(ENDPOINTS.EMPRESAS.BY_ID(id));
  }

  /**
   * Crea una nueva empresa en el backend.
   *
   * @param empresa - Datos de la empresa a crear (sin ID).
   * @returns Observable con la empresa creada incluyendo su ID generado.
   */
  create(empresa: Omit<Empresa, 'id'>): Observable<Empresa> {
    return this.api.post<Empresa>(ENDPOINTS.EMPRESAS.BASE, empresa);
  }

  /**
   * Actualiza una empresa existente en el backend.
   *
   * @param empresa - Datos completos de la empresa con ID.
   * @returns Observable con la empresa actualizada.
   */
  update(empresa: Empresa): Observable<Empresa> {
    return this.api.put<Empresa>(ENDPOINTS.EMPRESAS.BY_ID(empresa.id), empresa);
  }

  /**
   * Elimina una empresa por su ID.
   *
   * @param id - ID de la empresa a eliminar.
   * @returns Observable con true si se eliminó correctamente.
   */
  delete(id: number): Observable<boolean> {
    return this.api.delete<void>(ENDPOINTS.EMPRESAS.BY_ID(id)).pipe(map(() => true));
  }
  // #endregion
}
