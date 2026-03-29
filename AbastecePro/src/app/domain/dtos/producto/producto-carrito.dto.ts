/**
 * @fileoverview DTO de producto en el carrito de compras.
 * Estructura con los datos de un producto añadido al carrito incluyendo cantidad y subtotal.
 */

// #region DTO
/** DTO con los datos de un producto dentro del carrito de compras */
export interface ProductoCarritoDto {
  /** ID del producto */
  idProducto: number;
  /** Nombre del producto */
  nombre: string;
  /** Precio por unidad en euros */
  precioUnitario: number;
  /** Cantidad de unidades añadidas al carrito */
  cantidad: number;
  /** Subtotal calculado (cantidad × precioUnitario) */
  subtotal: number;
}
// #endregion
