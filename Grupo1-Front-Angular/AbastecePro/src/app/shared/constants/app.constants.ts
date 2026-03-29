/**
 * @fileoverview Constantes generales de la aplicación.
 * Centraliza todos los valores de configuración estáticos: nombre, versión,
 * claves de localStorage, fondos de pantalla, temas, roles y estados de pedido.
 */

// #region Información de la App
/** Nombre de la aplicación */
export const APP_NAME = 'AbastecePro';

/** Versión actual de la aplicación */
export const APP_VERSION = '1.0.0';
// #endregion

// #region Claves de LocalStorage
/** Claves utilizadas para almacenar datos en localStorage */
export const STORAGE_KEYS = {
  /** Usuario actualmente autenticado */
  CURRENT_USER: 'currentUser',
  /** Token de autenticación de Firebase */
  AUTH_TOKEN: 'authToken',
  /** Tema seleccionado (light / dark) */
  THEME: 'erp-theme',
  /** Fondo de pantalla seleccionado (1, 2, 3, etc.) */
  WALLPAPER: 'erp-wallpaper',
  /** Items del carrito de compras */
  CART_ITEMS: 'cartItems',
} as const;
// #endregion

// #region Fondos de Pantalla
/** Fondos de pantalla disponibles (gradientes CSS) */
export const WALLPAPERS = [
  { id: 1, nombre: 'Teal Corporativo',    archivo: 'gradient-1', gradiente: 'linear-gradient(135deg, #0D7377 0%, #065F5B 40%, #134E4A 100%)' },
  { id: 2, nombre: 'Atardecer Cálido',     archivo: 'gradient-2', gradiente: 'linear-gradient(135deg, #92400E 0%, #B45309 40%, #D97706 100%)' },
  { id: 3, nombre: 'Bosque Esmeralda',    archivo: 'gradient-3', gradiente: 'linear-gradient(135deg, #065F46 0%, #047857 40%, #059669 100%)' },
  { id: 4, nombre: 'Grafito Oscuro',      archivo: 'gradient-4', gradiente: 'linear-gradient(135deg, #1F2937 0%, #374151 40%, #4B5563 100%)' },
  { id: 5, nombre: 'Océano Profundo',     archivo: 'gradient-5', gradiente: 'linear-gradient(135deg, #164E63 0%, #155E75 40%, #0E7490 100%)' },
] as const;
// #endregion

// #region Temas
/** Temas visuales disponibles en la aplicación */
export const THEMES = [
  { id: 'light', nombre: 'Modo Claro', icono: '☀️' },
  { id: 'dark', nombre: 'Modo Oscuro', icono: '🌙' },
] as const;
// #endregion

// #region Roles
/** Roles de usuario definidos en el sistema */
export const ROLES = {
  /** Rol de administrador con acceso completo */
  ADMIN: 'administrador',
  /** Rol de empleado con acceso limitado */
  EMPLOYEE: 'empleado',
} as const;
// #endregion

// #region Estados de Pedido
/** Configuración visual de los estados de pedido (etiqueta, color, icono) */
export const ESTADOS_PEDIDO = {
  pendiente: { label: 'Pendiente', color: '#F59E0B', icon: '⏳' },
  enviado: { label: 'Enviado', color: '#3B82F6', icon: '📦' },
  entregado: { label: 'Entregado', color: '#22C55E', icon: '✅' },
  cancelado: { label: 'Cancelado', color: '#EF4444', icon: '❌' },
} as const;
// #endregion

// #region Skeleton Loading
/** Número de elementos skeleton a mostrar durante la carga según el contexto */
export const SKELETON_COUNT = {
  /** Cantidad de skeletons para tarjetas de producto */
  CARDS: 6,
  /** Cantidad de skeletons para items de lista */
  LIST_ITEMS: 8,
  /** Cantidad de skeletons para filas de tabla */
  TABLE_ROWS: 5,
} as const;
// #endregion
