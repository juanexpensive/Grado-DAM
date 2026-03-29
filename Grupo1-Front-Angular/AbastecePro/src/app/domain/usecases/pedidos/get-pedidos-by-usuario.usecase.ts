/**
 * @fileoverview Caso de uso: Obtener los pedidos de un usuario específico.
 * Filtra los pedidos por el identificador del usuario.
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
 * Caso de uso que recupera los pedidos filtrados por usuario.
 * Delega la consulta al repositorio de pedidos inyectado.
 */
@Injectable({ providedIn: 'root' })
export class GetPedidosByUsuarioUseCase {
  /** @param pedidoRepo Repositorio de pedidos inyectado por token */
  constructor(@Inject(PEDIDO_REPOSITORY_TOKEN) private readonly pedidoRepo: IPedidoRepository) {}

  /**
   * Ejecuta la obtención de pedidos filtrados por ID de usuario.
   * @param idUsuario - Identificador del usuario cuyos pedidos se desean
   * @returns Observable con el listado de pedidos del usuario
   */
  execute(idUsuario: number): Observable<Pedido[]> {
    return this.pedidoRepo.getByUsuarioId(idUsuario);
  }
}
// #endregion
