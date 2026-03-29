/**
 * @fileoverview Modelos de vista del carrito de compras.
 * Estructuras que representan el estado del carrito en la interfaz de usuario.
 */

// #region Modelo de Item
/** Modelo de vista para un producto individual dentro del carrito */
export interface CarritoItemViewModel {
  /** ID del producto */
  idProducto: number;
  /** Nombre del producto */
  nombre: string;
  /** Precio por unidad en euros */
  precioUnitario: number;
  /** Cantidad de unidades añadidas */
  cantidad: number;
  /** Subtotal calculado (cantidad × precioUnitario) */
  subtotal: number;
  /** Stock disponible del producto */
  stock: number;
  /** ID de la empresa proveedora */
  idEmpresaProveedora: number;
  /** Nombre de la empresa proveedora */
  proveedorNombre: string;
}
// #endregion

// #region Modelo de Carrito
/** Modelo de vista para el estado completo del carrito de compras */
export interface CarritoViewModel {
  /** Lista de productos en el carrito */
  items: CarritoItemViewModel[];
  /** Número total de productos distintos */
  totalItems: number;
  /** Precio total del carrito en euros */
  precioTotal: number;
}
// #endregion
