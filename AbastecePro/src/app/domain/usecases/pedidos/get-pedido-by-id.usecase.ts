/**
 * @fileoverview Caso de uso: Obtener un pedido por su ID.
 * Busca y devuelve un pedido específico del sistema.
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
 * Caso de uso que busca un pedido específico por su identificador.
 * Delega la consulta al repositorio de pedidos inyectado.
 */
@Injectable({ providedIn: 'root' })
export class GetPedidoByIdUseCase {
  /** @param pedidoRepo Repositorio de pedidos inyectado por token */
  constructor(@Inject(PEDIDO_REPOSITORY_TOKEN) private readonly pedidoRepo: IPedidoRepository) {}

  /**
   * Ejecuta la búsqueda de un pedido por su identificador.
   * @param id - Identificador único del pedido
   * @returns Observable con el pedido encontrado
   */
  execute(id: number): Observable<Pedido> {
    return this.pedidoRepo.getById(id);
  }
}
// #endregion
