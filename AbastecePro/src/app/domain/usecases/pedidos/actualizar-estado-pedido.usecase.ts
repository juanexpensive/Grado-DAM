/**
 * @fileoverview Caso de uso: Actualizar el estado de un pedido.
 * Permite cambiar el estado de un pedido existente
 * (pendiente, enviado, entregado, cancelado).
 */

// #region Imports
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido, EstadoPedido } from '../../entities/pedido.entity';
import { IPedidoRepository } from '../../interfaces/repositories/i-pedido.repository';
import { PEDIDO_REPOSITORY_TOKEN } from '../../../di/types/injection.tokens';
// #endregion

// #region Caso de Uso
/**
 * Caso de uso que actualiza el estado de un pedido existente.
 * Delega la operación de actualización al repositorio de pedidos.
 */
@Injectable({ providedIn: 'root' })
export class ActualizarEstadoPedidoUseCase {
  /** @param pedidoRepo Repositorio de pedidos inyectado por token */
  constructor(@Inject(PEDIDO_REPOSITORY_TOKEN) private readonly pedidoRepo: IPedidoRepository) {}

  /**
   * Ejecuta la actualización del estado del pedido.
   * @param id - Identificador del pedido a actualizar
   * @param estado - Nuevo estado del pedido
   * @returns Observable con el pedido actualizado
   */
  execute(id: number, estado: EstadoPedido): Observable<Pedido> {
    return this.pedidoRepo.actualizarEstado(id, estado);
  }
}
// #endregion
