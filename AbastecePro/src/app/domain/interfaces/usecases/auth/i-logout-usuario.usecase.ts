/**
 * @fileoverview Interfaz del caso de uso: Cerrar sesión de usuario.
 * Finaliza la sesión activa del usuario actual.
 */

// #region Interfaz
/**
 * Contrato del caso de uso para el cierre de sesión.
 */
export interface ILogoutUsuarioUseCase {
  /** Ejecuta el cierre de sesión */
  execute(): void;
}
// #endregion
