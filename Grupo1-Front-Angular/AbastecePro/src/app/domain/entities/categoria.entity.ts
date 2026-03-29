/**
 * @fileoverview Entidad de Categoría.
 * Clasifica los productos del catálogo en grupos lógicos.
 */

// #region Entidad
/** Interfaz que define la estructura de una categoría de productos */
export interface Categoria {
  /** Identificador único de la categoría */
  id: number;
  /** Nombre descriptivo de la categoría */
  nombre: string;
  /** Indica si la categoría está activa */
  activo: boolean;
}
// #endregion
