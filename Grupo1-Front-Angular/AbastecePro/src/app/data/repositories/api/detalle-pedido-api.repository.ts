/**
 * Implementación API del repositorio de Detalles de Pedido.
 *
 * Conecta con el backend ASP.NET a través de la API REST para gestionar
 * las líneas de detalle de cada pedido (productos, cantidades, precios).
 * Incluye una función de normalización para convertir campos snake_case
 * de la API al formato camelCase utilizado en el dominio.
 */

// #region Imports
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of } from 'rxjs';

import { IDetallePedidoRepository } from '../../../domain/interfaces/repositories/i-detalle-pedido.repository';
import { DetallePedido } from '../../../domain/entities/detalle-pedido.entity';
import { ApiConnectionService } from '../../datasources/api/api-connection.service';
import { ENDPOINTS } from '../../datasources/api/endpoints.constants';
// #endregion

// #region Funciones auxiliares
/**
 * Normaliza los campos de un detalle de pedido recibido de la API.
 * La API puede enviar campos en snake_case (id_pedido) o camelCase (idPedido),
 * esta función unifica ambos formatos al camelCase del dominio.
 *
 * @param raw - Objeto crudo recibido de la API.
 * @returns Entidad DetallePedido con formato normalizado.
 */
function mapDetallePedido(raw: any): DetallePedido {
  return {
    id: raw.id,
    idPedido: raw.idPedido ?? raw.id_pedido,
    idProducto: raw.idProducto ?? raw.id_producto,
    cantidadProducto: raw.cantidadProducto ?? raw.cantidad_producto,
    precioUnitario: raw.precioUnitario ?? raw.precio_unitario,
  };
}
// #endregion

@Injectable()
export class DetallePedidoApiRepository implements IDetallePedidoRepository {

  // #region Constructor
  /**
   * @param api - Servicio de conexión a la API para realizar peticiones HTTP.
   */
  constructor(private readonly api: ApiConnectionService) {}
  // #endregion

  // #region Métodos públicos
  /**
   * Obtiene todos los detalles de pedido desde la API.
   *
   * @returns Observable con la lista completa de detalles normalizados.
   */
  getAll(): Observable<DetallePedido[]> {
    return this.api.get<any[]>(ENDPOINTS.DETALLES_PEDIDO.BASE).pipe(
      map(detalles => detalles.map(mapDetallePedido))
    );
  }

  /**
   * Obtiene un detalle de pedido por su ID.
   *
   * @param id - ID del detalle a buscar.
   * @returns Observable con el detalle normalizado.
   */
  getById(id: number): Observable<DetallePedido> {
    return this.api.get<any>(ENDPOINTS.DETALLES_PEDIDO.BY_ID(id)).pipe(
      map(mapDetallePedido)
    );
  }

  /**
   * Obtiene todos los detalles de un pedido específico.
   * Filtra localmente desde la lista completa de detalles.
   *
   * @param idPedido - ID del pedido cuyos detalles se quieren obtener.
   * @returns Observable con los detalles que pertenecen al pedido indicado.
   */
  getByPedidoId(idPedido: number): Observable<DetallePedido[]> {
    return this.getAll().pipe(
      map(detalles => detalles.filter(d => d.idPedido === idPedido))
    );
  }

  /**
   * Crea un nuevo detalle de pedido en el backend.
   *
   * @param detalle - Datos del detalle a crear (sin ID).
   * @returns Observable con el detalle creado normalizado.
   */
  create(detalle: Omit<DetallePedido, 'id'>): Observable<DetallePedido> {
    return this.api.post<any>(ENDPOINTS.DETALLES_PEDIDO.BASE, detalle).pipe(
      map(raw => raw ? mapDetallePedido(raw) : detalle as DetallePedido)
    );
  }

  /**
   * Crea múltiples detalles de pedido en paralelo mediante forkJoin.
   * Se usa al crear un pedido con varias líneas de productos.
   *
   * @param detalles - Array de detalles a crear (sin ID).
   * @returns Observable con todos los detalles creados. Array vacío si no hay detalles.
   */
  createMany(detalles: Omit<DetallePedido, 'id'>[]): Observable<DetallePedido[]> {
    if (detalles.length === 0) return of([]);
    return forkJoin(detalles.map(d => this.create(d)));
  }

  /**
   * Actualiza un detalle de pedido existente.
   *
   * @param detalle - Datos completos del detalle con ID.
   * @returns Observable con el detalle actualizado normalizado.
   */
  update(detalle: DetallePedido): Observable<DetallePedido> {
    return this.api.put<any>(ENDPOINTS.DETALLES_PEDIDO.BY_ID(detalle.id), detalle).pipe(
      map(raw => raw ? mapDetallePedido(raw) : detalle)
    );
  }

  /**
   * Elimina un detalle de pedido por su ID.
   *
   * @param id - ID del detalle a eliminar.
   * @returns Observable con true si se eliminó correctamente.
   */
  delete(id: number): Observable<boolean> {
    return this.api.delete<void>(ENDPOINTS.DETALLES_PEDIDO.BY_ID(id)).pipe(map(() => true));
  }
  // #endregion
}
