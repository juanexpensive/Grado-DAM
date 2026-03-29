/**
 * @fileoverview Rutas del servidor para SSR (Server-Side Rendering).
 * Define el modo de renderizado de cada ruta. Las rutas dinámicas
 * se renderizan en el cliente; la ruta comodín se pre-renderiza.
 */

// #region Imports
import { RenderMode, ServerRoute } from '@angular/ssr';
// #endregion

// #region Rutas del Servidor
/**
 * Configuración de rutas del servidor.
 * Todas las rutas de la aplicación se renderizan en el cliente (SPA),
 * excepto la ruta comodín que se pre-renderiza para SEO.
 */
export const serverRoutes: ServerRoute[] = [
  { path: 'login', renderMode: RenderMode.Client },
  { path: 'home', renderMode: RenderMode.Client },
  { path: 'compras', renderMode: RenderMode.Client },
  { path: 'compras/producto/:id', renderMode: RenderMode.Client },
  { path: 'compras/carrito', renderMode: RenderMode.Client },
  { path: 'pedidos', renderMode: RenderMode.Client },
  { path: 'pedidos/:id', renderMode: RenderMode.Client },
  { path: 'usuarios', renderMode: RenderMode.Client },
  { path: 'usuarios/crear', renderMode: RenderMode.Client },
  { path: 'usuarios/editar/:id', renderMode: RenderMode.Client },
  { path: 'ajustes', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender },
];
// #endregion
