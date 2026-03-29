/**
 * @fileoverview Punto de entrada del servidor para SSR (Server-Side Rendering).
 * Exporta la función de bootstrap que Angular SSR invoca para renderizar
 * la aplicación en el servidor con la configuración combinada (cliente + servidor).
 */

// #region Bootstrap del Servidor
import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

/** Función de bootstrap invocada por el motor SSR de Angular */
const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(App, config, context);

export default bootstrap;
// #endregion
