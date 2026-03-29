/**
 * @fileoverview DTO de detalle completo de producto.
 * Estructura con toda la información de un producto incluyendo datos del proveedor.
 */

// #region DTO
/** DTO con los datos completos de un producto para la vista de detalle */
export interface ProductoDetalleDto {
  /** Identificador único del producto */
  id: number;
  /** Nombre del producto */
  nombre: string;
  /** Descripción detallada del producto */
  descripcion: string;
  /** Precio unitario en euros */
  precio: number;
  /** Cantidad disponible en stock */
  stock: number;
  /** Nombre de la categoría del producto */
  categoriaNombre: string;
  /** Nombre de la empresa proveedora */
  proveedorNombre: string;
  /** Teléfono del proveedor */
  proveedorTelefono: string;
  /** Correo electrónico del proveedor */
  proveedorCorreo: string;
}
// #endregion
