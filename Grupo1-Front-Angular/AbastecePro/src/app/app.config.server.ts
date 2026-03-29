/**
 * @fileoverview Configuración del servidor para SSR (Server-Side Rendering).
 * Combina la configuración base de la aplicación con los providers
 * específicos del servidor, incluyendo las rutas de renderizado.
 */

// #region Imports
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
// #endregion

// #region Configuración del Servidor
/** Configuración específica del servidor con provider de SSR y rutas del servidor */
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

/** Configuración final que fusiona la config base del cliente con la del servidor */
export const config = mergeApplicationConfig(appConfig, serverConfig);
// #endregion
