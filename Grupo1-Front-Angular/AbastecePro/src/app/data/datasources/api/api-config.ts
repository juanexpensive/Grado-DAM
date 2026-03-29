/**
 * @fileoverview Configuración de la API REST.
 * Centraliza la URL base y parámetros de conexión con el backend ASP.NET.
 */

// #region Configuración
export const API_CONFIG = {
  /**
   * URL base del backend ASP.NET.
   * En desarrollo se usa '/api' (proxy de Angular via proxy.conf.json).
   * En producción (con CORS habilitado) apuntará directamente al backend.
   */
  baseUrl: '/api',
  /** Timeout máximo de las peticiones HTTP en milisegundos */
  timeout: 30000,
};
// #endregion
