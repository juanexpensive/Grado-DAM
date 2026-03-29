/**
 * @fileoverview DTO de información de empresa.
 * Estructura con los datos esenciales de una empresa para mostrar en la UI.
 */

// #region DTO
/** DTO con la información básica de la empresa */
export interface EmpresaInfoDto {
  /** Identificador único de la empresa */
  id: number;
  /** Nombre o razón social de la empresa */
  nombre: string;
  /** Código de Identificación Fiscal */
  cif: string;
  /** Dirección postal */
  direccion: string;
  /** Teléfono de contacto */
  telefono: string;
  /** Correo electrónico de contacto */
  correo: string;
  /** Código IBAN de la cuenta bancaria */
  iban: string;
}
// #endregion
