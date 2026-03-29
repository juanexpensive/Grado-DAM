/**
 * @fileoverview DTO de producto para tarjetas del catálogo.
 * Estructura con los datos necesarios para renderizar un producto en formato card.
 */

// #region DTO
/** DTO con los datos de un producto para mostrar en tarjeta del catálogo */
export interface ProductoCardDto {
  /** Identificador único del producto */
  id: number;
  /** Nombre del producto */
  nombre: string;
  /** Descripción breve del producto */
  descripcion: string;
  /** Precio unitario en euros */
  precio: number;
  /** Cantidad disponible en stock */
  stock: number;
  /** Nombre de la categoría del producto */
  categoriaNombre: string;
  /** Nombre de la empresa proveedora */
  proveedorNombre: string;
}
// #endregion
