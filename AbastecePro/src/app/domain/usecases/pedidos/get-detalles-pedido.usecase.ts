/**
 * @fileoverview Caso de uso: Obtener los detalles (líneas) de un pedido.
 * Devuelve todos los productos y cantidades asociados a un pedido específico.
 */

// #region Imports
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DetallePedido } from '../../entities/detalle-pedido.entity';
import { IDetallePedidoRepository } from '../../interfaces/repositories/i-detalle-pedido.repository';
import { DETALLE_PEDIDO_REPOSITORY_TOKEN } from '../../../di/types/injection.tokens';
// #endregion

// #region Caso de Uso
/**
 * Caso de uso que recupera las líneas de detalle de un pedido.
 * Delega la consulta al repositorio de detalles de pedido.
 */
@Injectable({ providedIn: 'root' })
export class GetDetallesPedidoUseCase {
  /** @param detallePedidoRepo Repositorio de detalles de pedido inyectado por token */
  constructor(@Inject(DETALLE_PEDIDO_REPOSITORY_TOKEN) private readonly detallePedidoRepo: IDetallePedidoRepository) {}

  /**
   * Ejecuta la obtención de los detalles de un pedido.
   * @param idPedido - Identificador del pedido cuyos detalles se desean obtener
   * @returns Observable con el listado de líneas del pedido
   */
  execute(idPedido: number): Observable<DetallePedido[]> {
    return this.detallePedidoRepo.getByPedidoId(idPedido);
  }
}
// #endregion
