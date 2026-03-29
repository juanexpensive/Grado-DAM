/**
 * @fileoverview Interfaz del caso de uso: Obtener pedidos por usuario.
 * Recupera todos los pedidos asociados a un usuario específico.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Pedido } from '../../../entities/pedido.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para obtener pedidos filtrados por usuario.
 */
export interface IGetPedidosByUsuarioUseCase {
  /** Ejecuta la consulta de pedidos filtrados por el identificador del usuario */
  execute(idUsuario: number): Observable<Pedido[]>;
}
// #endregion
