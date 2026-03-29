/**
 * @fileoverview DTO de filtro de categoría.
 * Estructura simplificada para usar categorías como opciones de filtrado.
 */

// #region DTO
/** DTO con los datos mínimos de una categoría para filtros de búsqueda */
export interface CategoriaFiltroDto {
  /** Identificador único de la categoría */
  id: number;
  /** Nombre de la categoría */
  nombre: string;
}
// #endregion
