/**
 * @fileoverview Entidad de Empresa.
 * Representa una empresa registrada en el sistema ERP
 * (puede ser proveedora o consumidora).
 */

// #region Entidad
/** Interfaz que define la estructura de una empresa */
export interface Empresa {
  /** Identificador único de la empresa */
  id: number;
  /** Código de Identificación Fiscal */
  cif: string;
  /** Nombre comercial de la empresa */
  nombre: string;
  /** Teléfono de contacto */
  telefono: string;
  /** Correo electrónico corporativo */
  correo: string;
  /** Número de cuenta bancaria IBAN */
  iban: string;
  /** ID de la dirección asociada */
  idDireccion: number;
  /** Indica si la empresa está activa */
  activo: boolean;
}
// #endregion
