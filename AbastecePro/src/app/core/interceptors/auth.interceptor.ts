/**
 * Interceptor funcional de autenticación HTTP.
 *
 * Se ejecuta en cada petición HTTP saliente y añade automáticamente
 * el token de autenticación (si existe) como cabecera Authorization Bearer.
 *
 * El token se obtiene de localStorage con la clave 'authToken'.
 * Si no hay token almacenado, la petición continúa sin modificarse.
 *
 * Nota: Actualmente preparado para integración futura con tokens de Firebase Auth.
 */

// #region Imports
import { HttpInterceptorFn } from '@angular/common/http';
// #endregion

// #region Interceptor
/**
 * Función interceptora que inyecta el token de autenticación en las peticiones HTTP.
 *
 * @param req - Petición HTTP original.
 * @param next - Handler para continuar con la cadena de interceptores.
 * @returns Observable de la respuesta HTTP (con o sin token añadido).
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  /**
   * TODO: Cuando se integre completamente Firebase Auth, obtener el token
   * idóneo y añadirlo como header Authorization: Bearer <token>
   */
  // Obtiene el token de localStorage (solo en el navegador)
  const token = typeof localStorage !== 'undefined'
    ? localStorage.getItem('authToken')
    : null;

  // Si hay token, clona la petición añadiendo la cabecera Authorization
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  // Si no hay token, continúa sin modificar la petición
  return next(req);
};
// #endregion
