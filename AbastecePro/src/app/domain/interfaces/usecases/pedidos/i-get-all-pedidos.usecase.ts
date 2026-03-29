/**
 * @fileoverview Interfaz del caso de uso: Obtener todos los pedidos.
 * Recupera la lista completa de pedidos registrados en el sistema.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Pedido } from '../../../entities/pedido.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para obtener todos los pedidos.
 */
export interface IGetAllPedidosUseCase {
  /** Ejecuta la consulta de todos los pedidos */
  execute(): Observable<Pedido[]>;
}
// #endregion
