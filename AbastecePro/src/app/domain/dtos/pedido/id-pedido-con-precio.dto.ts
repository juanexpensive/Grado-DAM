/**
 * @fileoverview DTO de respuesta tras crear un pedido.
 * Contiene el identificador y precio total del pedido recién creado.
 */

// #region DTO
/** DTO con el ID y precio total devuelto al crear un pedido exitosamente */
export interface IdPedidoConPrecioDto {
  /** Identificador único del pedido creado */
  id: number;
  /** Precio total calculado del pedido */
  precioTotal: number;
}
// #endregion
