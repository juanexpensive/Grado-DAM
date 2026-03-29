/**
 * @fileoverview Modelo de vista para pedidos.
 * Estructura que representa un pedido con datos formateados para la interfaz.
 */

// #region Modelo
/** Modelo de vista para mostrar un pedido en la interfaz */
export interface PedidoViewModel {
  /** Identificador único del pedido */
  id: number;
  /** Fecha del pedido en formato ISO 8601 */
  fecha: string;
  /** Fecha formateada en español (ej: '15 de enero de 2025') */
  fechaFormateada: string;
  /** Nombre de la empresa proveedora */
  proveedorNombre: string;
  /** Precio total del pedido en euros */
  precioTotal: number;
  /** Precio total formateado como moneda (ej: '1.234,50 €') */
  precioTotalFormateado: string;
  /** Estado actual del pedido (ej: 'pendiente', 'enviado') */
  estado: string;
  /** Color asociado al estado (hexadecimal) */
  estadoColor: string;
  /** Icono emoji asociado al estado */
  estadoIcon: string;
  /** Nombre del usuario que realizó el pedido */
  usuarioNombre: string;
}
// #endregion
