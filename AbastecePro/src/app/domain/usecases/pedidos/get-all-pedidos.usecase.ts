/**
 * @fileoverview Caso de uso: Obtener todos los pedidos del sistema.
 * Devuelve la lista completa de pedidos registrados.
 */

// #region Imports
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../../entities/pedido.entity';
import { IPedidoRepository } from '../../interfaces/repositories/i-pedido.repository';
import { PEDIDO_REPOSITORY_TOKEN } from '../../../di/types/injection.tokens';
// #endregion

// #region Caso de Uso
/**
 * Caso de uso que recupera todos los pedidos del sistema.
 * Delega la consulta al repositorio de pedidos inyectado.
 */
@Injectable({ providedIn: 'root' })
export class GetAllPedidosUseCase {
  /** @param pedidoRepo Repositorio de pedidos inyectado por token */
  constructor(@Inject(PEDIDO_REPOSITORY_TOKEN) private readonly pedidoRepo: IPedidoRepository) {}

  /**
   * Ejecuta la obtención de todos los pedidos.
   * @returns Observable con el listado completo de pedidos
   */
  execute(): Observable<Pedido[]> {
    return this.pedidoRepo.getAll();
  }
}
// #endregion
