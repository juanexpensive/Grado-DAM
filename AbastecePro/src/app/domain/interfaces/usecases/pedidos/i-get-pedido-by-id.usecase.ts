/**
 * @fileoverview Interfaz del caso de uso: Obtener un pedido por su ID.
 * Busca y devuelve un pedido específico según su identificador.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Pedido } from '../../../entities/pedido.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para obtener un pedido por su ID.
 */
export interface IGetPedidoByIdUseCase {
  /** Ejecuta la búsqueda de un pedido por su identificador */
  execute(id: number): Observable<Pedido>;
}
// #endregion
