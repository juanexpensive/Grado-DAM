/**
 * @fileoverview DTO de usuario para listados.
 * Estructura resumida de un usuario para mostrar en tablas y listados.
 */

// #region DTO
/** DTO con los datos resumidos de un usuario para el listado */
export interface UsuarioListadoDto {
  /** Identificador único del usuario */
  id: number;
  /** Nombre del usuario */
  nombre: string;
  /** Apellidos del usuario */
  apellidos: string;
  /** Correo electrónico */
  correo: string;
  /** Teléfono de contacto */
  telefono: string;
  /** Rol del usuario en el sistema */
  rol: string;
}
// #endregion
