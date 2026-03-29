/**
 * @fileoverview Definición de rutas principales de AbastecePro.
 * Usa lazy loading para cada módulo de funcionalidad, guards de autenticación
 * y autorización por rol (admin). Todas las rutas cargan componentes standalone.
 */

// #region Imports
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
// #endregion

// #region Rutas
/**
 * Tabla de rutas principal de la aplicación.
 * - Rutas públicas: login
 * - Rutas protegidas (authGuard): home, compras, pedidos, ajustes
 * - Rutas de admin (authGuard + adminGuard): usuarios
 */
export const routes: Routes = [
  /** Redirige la raíz al login */
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  /** Autenticación - pantalla de inicio de sesión */
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/screens/login/login.component').then(m => m.LoginComponent),
  },

  /** Menú principal - dashboard con tarjetas de módulos */
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/home/screens/main-menu/main-menu.component').then(m => m.MainMenuComponent),
  },

  /** Módulo de compras - catálogo de productos */
  {
    path: 'compras',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/compras/screens/busqueda-productos/busqueda-productos.component').then(m => m.BusquedaProductosComponent),
  },
  /** Detalle de un producto específico */
  {
    path: 'compras/producto/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/compras/screens/detalle-producto/detalle-producto.component').then(m => m.DetalleProductoComponent),
  },
  /** Carrito de compras del usuario */
  {
    path: 'compras/carrito',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/compras/screens/carrito/carrito.component').then(m => m.CarritoComponent),
  },

  /** Módulo de pedidos - historial de pedidos realizados */
  {
    path: 'pedidos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pedidos/screens/historial-pedidos/historial-pedidos.component').then(m => m.HistorialPedidosComponent),
  },
  /** Detalle de un pedido específico */
  {
    path: 'pedidos/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pedidos/screens/detalle-pedido/detalle-pedido.component').then(m => m.DetallePedidoComponent),
  },

  /** Módulo de usuarios - listado (solo administradores) */
  {
    path: 'usuarios',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/usuarios/screens/listado-usuarios/listado-usuarios.component').then(m => m.ListadoUsuariosComponent),
  },
  /** Crear nuevo usuario (solo administradores) */
  {
    path: 'usuarios/crear',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/usuarios/screens/crear-usuario/crear-usuario.component').then(m => m.CrearUsuarioComponent),
  },
  /** Editar usuario existente (solo administradores) */
  {
    path: 'usuarios/editar/:id',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/usuarios/screens/editar-usuario/editar-usuario.component').then(m => m.EditarUsuarioComponent),
  },

  /** Módulo de ajustes - configuración de la aplicación */
  {
    path: 'ajustes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/ajustes/screens/configuracion/configuracion.component').then(m => m.ConfiguracionComponent),
  },

  /** Ruta comodín - redirige cualquier ruta no definida al login */
  { path: '**', redirectTo: 'login' },
];
// #endregion
