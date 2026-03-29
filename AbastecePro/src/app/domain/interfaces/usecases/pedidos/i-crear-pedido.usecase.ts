/**
 * @fileoverview Interfaz del caso de uso: Crear un nuevo pedido.
 * Registra un pedido de compra en el sistema a partir del DTO proporcionado.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Pedido } from '../../../entities/pedido.entity';
import { CrearPedidoDto } from '../../../dtos/pedido/crear-pedido.dto';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para crear un nuevo pedido.
 */
export interface ICrearPedidoUseCase {
  /** Ejecuta la creación de un nuevo pedido */
  execute(pedido: CrearPedidoDto): Observable<Pedido>;
}
// #endregion
