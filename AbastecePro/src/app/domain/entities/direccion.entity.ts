/**
 * @fileoverview Entidad de Dirección.
 * Representa una dirección postal completa en el sistema.
 */

// #region Entidad
/** Interfaz que define la estructura de una dirección postal */
export interface Direccion {
  /** Identificador único de la dirección */
  id: number;
  /** Número del edificio o portal */
  numero: string;
  /** Nombre de la calle */
  calle: string;
  /** Código postal */
  codigoPostal: string;
  /** Ciudad */
  ciudad: string;
  /** País */
  pais: string;
  /** Indica si la dirección está activa */
  activo: boolean;
}
// #endregion
