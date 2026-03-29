/**
 * @fileoverview DTO de detalle completo de pedido.
 * Estructura que contiene toda la información de un pedido incluyendo sus líneas de producto.
 */

// #region Imports
import { DetallePedido } from '../../entities/detalle-pedido.entity';
// #endregion

// #region DTO Principal
/** DTO con el detalle completo de un pedido para la vista de detalle */
export interface PedidoDetalleDto {
  /** Identificador único del pedido */
  id: number;
  /** Fecha de creación del pedido (ISO 8601) */
  fecha: string;
  /** Nombre completo del usuario que creó el pedido */
  usuarioNombre: string;
  /** Nombre de la empresa proveedora */
  empresaProveedoraNombre: string;
  /** Dirección completa de entrega */
  direccionCompleta: string;
  /** Precio total del pedido en euros */
  precioTotal: number;
  /** Estado actual del pedido (ej: 'pendiente', 'enviado') */
  estado: string;
  /** Líneas de detalle con los productos del pedido */
  detalles: DetallePedidoLineaDto[];
}
// #endregion

// #region DTO Línea de Detalle
/** DTO que representa una línea individual dentro del detalle de un pedido */
export interface DetallePedidoLineaDto {
  /** ID del producto */
  idProducto: number;
  /** Nombre del producto */
  productoNombre: string;
  /** Cantidad de unidades pedidas */
  cantidadProducto: number;
  /** Precio por unidad en el momento de la compra */
  precioUnitario: number;
  /** Subtotal de esta línea (cantidad × precio) */
  subtotal: number;
}
// #endregion
