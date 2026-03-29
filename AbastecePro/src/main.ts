/**
 * @fileoverview Punto de entrada principal de la aplicación AbastecePro (cliente).
 * Arranca la aplicación Angular en el navegador con la configuración global.
 */

// #region Bootstrap
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
// #endregion
