/**
 * @fileoverview Modelo de vista para usuarios.
 * Estructura que representa un usuario con datos formateados para la interfaz.
 */

// #region Modelo
/** Modelo de vista para mostrar un usuario en la interfaz */
export interface UsuarioViewModel {
  /** Identificador único del usuario */
  id: number;
  /** Nombre completo del usuario (nombre + apellidos) */
  nombreCompleto: string;
  /** Correo electrónico */
  correo: string;
  /** Teléfono de contacto */
  telefono: string;
  /** Rol del usuario en el sistema */
  rol: string;
  /** Iniciales del usuario (para avatares) */
  iniciales: string;
}
// #endregion
