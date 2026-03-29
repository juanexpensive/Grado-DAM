/**
 * @fileoverview Servidor Express para SSR de AbastecePro.
 * Configura el servidor Node.js/Express que sirve la aplicación Angular
 * con Server-Side Rendering, archivos estáticos y proxy de API.
 */

// #region Imports
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
// #endregion

// #region Configuración del Servidor
/** Ruta al directorio de distribución del navegador (archivos estáticos compilados) */
const browserDistFolder = join(import.meta.dirname, '../browser');

/** Instancia de Express */
const app = express();
/** Motor de renderizado SSR de Angular */
const angularApp = new AngularNodeAppEngine();
// #endregion

// #region Middlewares
/**
 * Middleware para rutas /api.
 * Las peticiones a la API se reenvían al backend (proxy en dev, reverse-proxy en prod).
 * No deben ser procesadas por el SSR de Angular.
 */
app.use('/api', (req, res, next) => {
  next();
});

/**
 * Middleware para servir archivos estáticos desde /browser.
 * Configura caché de 1 año para assets compilados.
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Middleware principal: renderiza la aplicación Angular para todas las demás rutas.
 * Si Angular no puede manejar la ruta, pasa al siguiente middleware.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});
// #endregion

// #region Inicio del Servidor
/**
 * Arranca el servidor si este módulo es el punto de entrada principal o se ejecuta via PM2.
 * Escucha en el puerto definido por la variable de entorno PORT (por defecto 4000).
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler utilizado por Angular CLI (dev-server y build) o Firebase Cloud Functions.
 * Exportado para integración con entornos serverless.
 */
export const reqHandler = createNodeRequestHandler(app);
// #endregion
