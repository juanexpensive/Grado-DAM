/**
 * @fileoverview Configuración principal de la aplicación AbastecePro.
 * Registra los providers globales: rutas con View Transitions, cliente HTTP
 * con interceptores (auth + error), hidratación del cliente y repositorios DI.
 */

// #region Imports
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { REPOSITORY_PROVIDERS } from './di/container/dependency-injection.container';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
// #endregion

// #region Configuración
/** Configuración raíz de la aplicación Angular con todos los providers globales */
export const appConfig: ApplicationConfig = {
  providers: [
    /** Listener global de errores del navegador */
    provideBrowserGlobalErrorListeners(),
    /** Rutas con animaciones de View Transitions API */
    provideRouter(routes, withViewTransitions()),
    /** Cliente HTTP con interceptores de autenticación y manejo de errores */
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    /** Hidratación del cliente con replay de eventos para SSR */
    provideClientHydration(withEventReplay()),
    /** Providers de repositorios (inyección de dependencias de Clean Architecture) */
    ...REPOSITORY_PROVIDERS,
  ],
};
// #endregion
