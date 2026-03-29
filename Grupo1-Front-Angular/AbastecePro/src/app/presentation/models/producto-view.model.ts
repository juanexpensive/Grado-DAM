/**
 * @fileoverview Modelo de vista para productos.
 * Estructura que representa un producto con datos formateados para la interfaz.
 */

// #region Modelo
/** Modelo de vista para mostrar un producto en la interfaz */
export interface ProductoViewModel {
  /** Identificador único del producto */
  id: number;
  /** Nombre del producto */
  nombre: string;
  /** Descripción del producto */
  descripcion: string;
  /** Precio unitario en euros */
  precio: number;
  /** Precio formateado como moneda (ej: '12,50 €') */
  precioFormateado: string;
  /** Cantidad disponible en stock */
  stock: number;
  /** Nombre de la categoría del producto */
  categoriaNombre: string;
  /** Nombre de la empresa proveedora */
  proveedorNombre: string;
  /** ID de la empresa proveedora */
  idEmpresaProveedora: number;
  /** Indica si el producto tiene stock disponible (stock > 0) */
  enStock: boolean;
}
// #endregion
