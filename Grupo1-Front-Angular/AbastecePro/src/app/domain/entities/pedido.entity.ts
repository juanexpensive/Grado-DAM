/**
 * @fileoverview Entidad de Pedido.
 * Representa una orden de compra realizada a una empresa proveedora.
 */

// #region Tipos
/** Estados posibles de un pedido en el sistema */
export type EstadoPedido = 'pendiente' | 'enviado' | 'entregado' | 'cancelado';
// #endregion

// #region Entidad
/** Interfaz que define la estructura de un pedido de compra */
export interface Pedido {
  /** Identificador único del pedido */
  id: number;
  /** Fecha de creación del pedido (ISO 8601) */
  fecha: string;
  /** Precio total del pedido en euros */
  precioTotal: number;
  /** Estado actual del pedido */
  estado: EstadoPedido;
  /** ID del usuario que creó el pedido */
  idUsuario: number;
  /** ID de la empresa proveedora */
  idEmpresaProveedora: number;
  /** ID de la empresa consumidora */
  idEmpresaConsumidora: number;
  /** Indica si el pedido está activo */
  activo: boolean;
}
// #endregion
