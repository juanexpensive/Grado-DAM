/**
 * Implementación API del repositorio de Pedidos.
 *
 * Conecta con el backend ASP.NET a través de la API REST para gestionar
 * el ciclo de vida de los pedidos de compra.
 *
 * Incluye lógica de mapeo para convertir los estados numéricos de la API
 * (0=pendiente, 1=enviado, 2=entregado, 3=cancelado) al formato string
 * utilizado en el dominio de la aplicación.
 */

// #region Imports
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap, catchError } from 'rxjs';

import { IPedidoRepository } from '../../../domain/interfaces/repositories/i-pedido.repository';
import { Pedido, EstadoPedido } from '../../../domain/entities/pedido.entity';
import { ApiConnectionService } from '../../datasources/api/api-connection.service';
import { ENDPOINTS } from '../../datasources/api/endpoints.constants';
// #endregion

// #region Mapeo de estados
/** Mapeo de valor numérico (API) a string del dominio para el estado del pedido */
const ESTADO_MAP: Record<number, EstadoPedido> = {
  0: 'pendiente',
  1: 'enviado',
  2: 'entregado',
  3: 'cancelado',
};

/** Mapeo inverso: de string del dominio a valor numérico para enviar a la API */
const ESTADO_REVERSE_MAP: Record<string, number> = {
  pendiente: 0,
  enviado: 1,
  entregado: 2,
  cancelado: 3,
};
// #endregion

// #region Funciones auxiliares
/**
 * Normaliza el estado de un pedido recibido de la API.
 * Acepta tanto valores numéricos como strings.
 *
 * @param estado - Estado recibido de la API (número o string).
 * @returns Estado normalizado como EstadoPedido.
 */
function normalizarEstado(estado: any): EstadoPedido {
  if (typeof estado === 'number') {
    return ESTADO_MAP[estado] ?? 'pendiente';
  }
  const str = String(estado).toLowerCase().trim();
  if (str in ESTADO_REVERSE_MAP) return str as EstadoPedido;
  return 'pendiente';
}

/**
 * Convierte un pedido crudo recibido de la API al formato del dominio.
 * Normaliza el campo 'estado' de numérico a string.
 *
 * @param raw - Objeto crudo del pedido recibido de la API.
 * @returns Entidad Pedido con estado normalizado.
 */
function mapPedido(raw: any): Pedido {
  return {
    ...raw,
    estado: normalizarEstado(raw.estado),
  };
}
// #endregion

@Injectable()
export class PedidoApiRepository implements IPedidoRepository {

  // #region Constructor
  /**
   * @param api - Servicio de conexión a la API para realizar peticiones HTTP.
   */
  constructor(private readonly api: ApiConnectionService) {}
  // #endregion

  // #region Métodos públicos
  /**
   * Obtiene todos los pedidos desde la API.
   *
   * @returns Observable con la lista completa de pedidos con estados normalizados.
   */
  getAll(): Observable<Pedido[]> {
    return this.api.get<any[]>(ENDPOINTS.PEDIDOS.BASE).pipe(
      map(pedidos => pedidos.map(mapPedido))
    );
  }

  /**
   * Obtiene los pedidos de un usuario específico.
   * Filtra localmente desde la lista completa de pedidos.
   *
   * @param idUsuario - ID del usuario cuyos pedidos se quieren obtener.
   * @returns Observable con los pedidos del usuario indicado.
   */
  getByUsuarioId(idUsuario: number): Observable<Pedido[]> {
    return this.getAll().pipe(
      map(pedidos => pedidos.filter(p => p.idUsuario === idUsuario))
    );
  }

  /**
   * Obtiene un pedido por su ID.
   *
   * @param id - ID del pedido a buscar.
   * @returns Observable con el pedido encontrado y estado normalizado.
   */
  getById(id: number): Observable<Pedido> {
    return this.api.get<any>(ENDPOINTS.PEDIDOS.BY_ID(id)).pipe(
      map(mapPedido)
    );
  }

  /**
   * Crea un nuevo pedido en el backend.
   *
   * Convierte el estado string a numérico antes de enviar a la API.
   * Si la API devuelve un body vacío (sin ID), obtiene el pedido recién
   * creado buscándolo como el más reciente del usuario.
   *
   * @param pedido - Datos del pedido a crear (sin ID).
   * @returns Observable con el pedido creado incluyendo su ID generado.
   */
  create(pedido: Omit<Pedido, 'id'>): Observable<Pedido> {
    // Convierte el estado string al valor numérico que espera la API
    const payload = {
      ...pedido,
      estado: ESTADO_REVERSE_MAP[pedido.estado] ?? 0,
    };
    return this.api.post<any>(ENDPOINTS.PEDIDOS.BASE, payload).pipe(
      switchMap(raw => {
        if (raw && raw.id) return of(mapPedido(raw));
        // La API devuelve body vacío — busca el pedido recién creado como el más reciente
        return this.getByUsuarioId(pedido.idUsuario).pipe(
          map(pedidos => {
            if (pedidos.length === 0) throw new Error('No se encontró el pedido recién creado.');
            const sorted = [...pedidos].sort((a, b) => b.id - a.id);
            return sorted[0];
          })
        );
      })
    );
  }

  /**
   * Actualiza el estado de un pedido existente.
   *
   * Flujo:
   * 1. Obtiene el pedido actual con todos sus datos.
   * 2. Actualiza únicamente el campo estado (convirtiendo a numérico).
   * 3. Si el PUT devuelve body vacío, hace refetch del pedido.
   *
   * @param id - ID del pedido a actualizar.
   * @param estado - Nuevo estado del pedido.
   * @returns Observable con el pedido actualizado.
   */
  actualizarEstado(id: number, estado: EstadoPedido): Observable<Pedido> {
    return this.getById(id).pipe(
      switchMap(pedido => {
        const payload = {
          ...pedido,
          estado: ESTADO_REVERSE_MAP[estado] ?? 0,
        };
        return this.api.put<any>(ENDPOINTS.PEDIDOS.BY_ID(id), payload).pipe(
          map(raw => raw ? mapPedido(raw) : { ...pedido, estado }),
          // Si el PUT devuelve body vacío o no parseable, refetch del servidor
          catchError(() => this.getById(id))
        );
      })
    );
  }

  /**
   * Elimina un pedido por su ID.
   *
   * @param id - ID del pedido a eliminar.
   * @returns Observable con true si se eliminó correctamente.
   */
  delete(id: number): Observable<boolean> {
    return this.api.delete<void>(ENDPOINTS.PEDIDOS.BY_ID(id)).pipe(map(() => true));
  }
  // #endregion
}
