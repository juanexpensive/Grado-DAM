/**
 * @fileoverview Interfaz del caso de uso: Obtener los detalles de un pedido.
 * Recupera todas las líneas de producto asociadas a un pedido específico.
 */

// #region Imports
import { Observable } from 'rxjs';
import { DetallePedido } from '../../../entities/detalle-pedido.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para obtener los detalles de un pedido.
 */
export interface IGetDetallesPedidoUseCase {
  /** Ejecuta la consulta de los detalles de un pedido por su identificador */
  execute(idPedido: number): Observable<DetallePedido[]>;
}
// #endregion
