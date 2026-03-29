/**
 * @fileoverview Entidad de DetallePedido.
 * Representa una línea de producto dentro de un pedido.
 * Un pedido puede contener múltiples detalles (productos).
 */

// #region Entidad
/** Interfaz que define la estructura de una línea de detalle de pedido */
export interface DetallePedido {
  /** Identificador único del detalle */
  id: number;
  /** ID del pedido al que pertenece */
  idPedido: number;
  /** ID del producto */
  idProducto: number;
  /** Cantidad de unidades del producto */
  cantidadProducto: number;
  /** Precio por unidad en el momento de la compra */
  precioUnitario: number;
}
// #endregion
