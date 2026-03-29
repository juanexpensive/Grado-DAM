/**
 * @fileoverview Modelo de vista para el selector de fondo de pantalla.
 * Estructura que representa una opción de fondo de pantalla en la configuración.
 */

// #region Modelo
/** Modelo de vista para una opción de fondo de pantalla */
export interface FondoPantallaViewModel {
  /** Identificador único del fondo */
  id: number;
  /** Nombre descriptivo del fondo */
  nombre: string;
  /** Nombre del archivo o identificador del gradiente */
  archivo: string;
  /** Indica si este fondo está actualmente seleccionado */
  seleccionado: boolean;
  /** URL o gradiente CSS para previsualizar el fondo */
  previewUrl: string;
}
// #endregion
