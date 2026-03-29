/**
 * @fileoverview DTO para la creación de pedidos.
 * Contiene las estructuras necesarias para enviar una solicitud de creación de pedido al backend.
 */

// #region DTO Principal
/** DTO con los datos necesarios para crear un nuevo pedido */
export interface CrearPedidoDto {
  /** ID del usuario que realiza el pedido */
  idUsuario: number;
  /** ID de la empresa proveedora a la que se le hace el pedido */
  idEmpresaProveedora: number;
  /** ID de la empresa consumidora que realiza el pedido */
  idEmpresaConsumidora: number;
  /** Lista de productos y cantidades del pedido */
  detalles: CrearDetallePedidoDto[];
}
// #endregion

// #region DTO Detalle
/** DTO con la información de una línea de producto dentro del pedido */
export interface CrearDetallePedidoDto {
  /** ID del producto a pedir */
  idProducto: number;
  /** Cantidad de unidades solicitadas */
  cantidadProducto: number;
  /** Precio unitario del producto en el momento de la compra */
  precioUnitario: number;
}
// #endregion
