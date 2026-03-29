/**
 * @fileoverview DTO de pedido para listados.
 * Estructura resumida de un pedido para mostrar en el historial y tablas.
 */

// #region DTO
/** DTO con los datos resumidos de un pedido para el listado/historial */
export interface PedidoListadoDto {
  /** Identificador único del pedido */
  id: number;
  /** Fecha de creación del pedido (ISO 8601) */
  fecha: string;
  /** Nombre de la empresa proveedora */
  empresaProveedoraNombre: string;
  /** Precio total del pedido en euros */
  precioTotal: number;
  /** Estado actual del pedido */
  estado: string;
  /** Nombre del usuario que realizó el pedido */
  usuarioNombre: string;
}
// #endregion
