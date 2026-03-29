/**
 * Interceptor funcional de errores HTTP.
 *
 * Captura todos los errores que ocurren en las peticiones HTTP y los
 * transforma en mensajes legibles para el usuario en español.
 *
 * Tipos de errores manejados:
 * - Errores del cliente (ErrorEvent): problemas de red o del navegador.
 * - Errores de parseo: respuestas con código 2xx pero cuerpo no parseable.
 * - Errores del servidor: códigos HTTP 0, 400, 401, 403, 404, 500, etc.
 *
 * Todos los errores se registran en consola con contexto para depuración.
 */

// #region Imports
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
// #endregion

// #region Interceptor
/**
 * Función interceptora que transforma errores HTTP en mensajes amigables.
 *
 * @param req - Petición HTTP original.
 * @param next - Handler para continuar con la cadena de interceptores.
 * @returns Observable de la respuesta HTTP, con errores transformados a mensajes legibles.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let mensajeError = 'Ha ocurrido un error inesperado.';

      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente (problema de red, CORS, etc.)
        mensajeError = `Error: ${error.error.message}`;
      } else if (error.status >= 200 && error.status < 300) {
        // Respuesta OK pero cuerpo no parseable (posible HTML en vez de JSON)
        console.warn('[ErrorInterceptor] Respuesta', error.status, 'con body no parseable:', error.error);
        mensajeError = 'Error al procesar la respuesta del servidor.';
      } else {
        // Error del lado del servidor: traduce códigos HTTP a mensajes en español
        switch (error.status) {
          case 0:
            mensajeError = 'No se pudo conectar con el servidor. Verifica tu conexión.';
            break;
          case 400:
            mensajeError = 'Solicitud incorrecta. Revisa los datos enviados.';
            break;
          case 401:
            mensajeError = 'No autorizado. Inicia sesión de nuevo.';
            break;
          case 403:
            mensajeError = 'No tienes permisos para realizar esta acción.';
            break;
          case 404:
            mensajeError = 'El recurso solicitado no fue encontrado.';
            break;
          case 500:
            mensajeError = 'Error interno del servidor. Inténtalo más tarde.';
            break;
          default:
            mensajeError = `Error ${error.status}: ${error.statusText}`;
        }
      }

      // Registra el error completo en consola para depuración
      console.error('[ErrorInterceptor]', mensajeError, error);
      return throwError(() => new Error(mensajeError));
    })
  );
};
// #endregion
