/**
 * Implementación API del repositorio de Direcciones.
 *
 * Conecta con el backend ASP.NET a través de la API REST para gestionar
 * las direcciones asociadas a usuarios o empresas.
 * Implementa la interfaz IDireccionRepository definida en el dominio.
 */

// #region Imports
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { IDireccionRepository } from '../../../domain/interfaces/repositories/i-direccion.repository';
import { Direccion } from '../../../domain/entities/direccion.entity';
import { ApiConnectionService } from '../../datasources/api/api-connection.service';
import { ENDPOINTS } from '../../datasources/api/endpoints.constants';
// #endregion

@Injectable()
export class DireccionApiRepository implements IDireccionRepository {

  // #region Constructor
  /**
   * @param api - Servicio de conexión a la API para realizar peticiones HTTP.
   */
  constructor(private readonly api: ApiConnectionService) {}
  // #endregion

  // #region Métodos públicos
  /**
   * Obtiene todas las direcciones desde la API.
   *
   * @returns Observable con la lista completa de direcciones.
   */
  getAll(): Observable<Direccion[]> {
    return this.api.get<Direccion[]>(ENDPOINTS.DIRECCIONES.BASE);
  }

  /**
   * Obtiene una dirección por su identificador.
   *
   * @param id - ID de la dirección a buscar.
   * @returns Observable con la dirección encontrada.
   */
  getById(id: number): Observable<Direccion> {
    return this.api.get<Direccion>(ENDPOINTS.DIRECCIONES.BY_ID(id));
  }

  /**
   * Crea una nueva dirección en el backend.
   *
   * @param direccion - Datos de la dirección a crear (sin ID).
   * @returns Observable con la dirección creada incluyendo su ID generado.
   */
  create(direccion: Omit<Direccion, 'id'>): Observable<Direccion> {
    return this.api.post<Direccion>(ENDPOINTS.DIRECCIONES.BASE, direccion);
  }

  /**
   * Actualiza una dirección existente en el backend.
   *
   * @param direccion - Datos completos de la dirección con ID.
   * @returns Observable con la dirección actualizada.
   */
  update(direccion: Direccion): Observable<Direccion> {
    return this.api.put<Direccion>(ENDPOINTS.DIRECCIONES.BY_ID(direccion.id), direccion);
  }

  /**
   * Elimina una dirección por su ID.
   *
   * @param id - ID de la dirección a eliminar.
   * @returns Observable con true si se eliminó correctamente.
   */
  delete(id: number): Observable<boolean> {
    return this.api.delete<void>(ENDPOINTS.DIRECCIONES.BY_ID(id)).pipe(map(() => true));
  }
  // #endregion
}
