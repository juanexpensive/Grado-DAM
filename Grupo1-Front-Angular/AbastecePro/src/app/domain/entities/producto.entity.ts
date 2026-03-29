/**
 * @fileoverview Entidad de Producto.
 * Representa un producto disponible para compra a empresas proveedoras.
 */

// #region Entidad
/** Interfaz que define la estructura de un producto del catálogo */
export interface Producto {
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
  /** ID de la categoría a la que pertenece */
  idCategoria: number;
  /** ID de la empresa proveedora que lo suministra */
  idEmpresaProveedora: number;
  /** Indica si el producto está activo */
  activo: boolean;
}
// #endregion
