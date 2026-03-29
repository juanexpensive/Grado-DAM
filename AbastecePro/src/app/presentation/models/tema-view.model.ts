/**
 * @fileoverview Modelo de vista para la configuración del tema.
 * Estructura que representa una opción de tema visual en los ajustes.
 */

// #region Modelo
/** Modelo de vista para una opción de tema de la aplicación */
export interface TemaViewModel {
  /** Identificador del tema ('light' o 'dark') */
  id: string;
  /** Nombre descriptivo del tema */
  nombre: string;
  /** Icono emoji representativo del tema */
  icono: string;
  /** Indica si este tema está actualmente activo */
  activo: boolean;
}
// #endregion
