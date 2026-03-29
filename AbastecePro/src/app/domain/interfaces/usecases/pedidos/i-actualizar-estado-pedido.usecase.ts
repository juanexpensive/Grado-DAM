/**
 * @fileoverview Interfaz del caso de uso: Actualizar el estado de un pedido.
 * Modifica el estado de un pedido existente (pendiente, enviado, entregado, cancelado).
 */

// #region Imports
import { Observable } from 'rxjs';
import { Pedido, EstadoPedido } from '../../../entities/pedido.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para actualizar el estado de un pedido.
 */
export interface IActualizarEstadoPedidoUseCase {
  /** Ejecuta la actualización del estado de un pedido */
  execute(id: number, estado: EstadoPedido): Observable<Pedido>;
}
// #endregion
