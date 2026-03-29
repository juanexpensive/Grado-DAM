/**
 * @fileoverview DTO de perfil de usuario.
 * Estructura con los datos completos del perfil de un usuario.
 */

// #region DTO
/** DTO con los datos completos del perfil de un usuario */
export interface UsuarioPerfilDto {
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
