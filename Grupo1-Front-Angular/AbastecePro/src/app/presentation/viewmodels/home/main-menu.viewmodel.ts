/**
 * ViewModel para el menú principal.
 *
 * Gestiona los módulos/aplicaciones visibles en el menú de inicio
 * según el rol del usuario autenticado. Los módulos marcados como
 * "soloAdmin" solo se muestran a usuarios con rol 'administrador'.
 */

// #region Imports
import { Injectable, signal, computed } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
// #endregion

// #region Interfaces
/**
 * Interfaz que define un módulo/aplicación del menú principal.
 * Cada módulo representa una sección navegable de la aplicación.
 */
export interface ModuloApp {
  /** Identificador único del módulo */
  id: string;
  /** Nombre visible del módulo en la UI */
  nombre: string;
  /** Descripción breve de la funcionalidad del módulo */
  descripcion: string;
  /** Emoji o icono representativo del módulo */
  icono: string;
  /** Ruta de navegación del módulo */
  ruta: string;
  /** Color de acento del módulo en formato hexadecimal */
  color: string;
  /** Si es true, el módulo solo es visible para administradores */
  soloAdmin: boolean;
}
// #endregion

// #region Configuración de módulos
/** Lista estática de todos los módulos disponibles en la aplicación */
const MODULOS: ModuloApp[] = [
  { id: 'compras', nombre: 'Compras', descripcion: 'Buscar y comprar productos', icono: '🛒', ruta: '/compras', color: '#0D7377', soloAdmin: false },
  { id: 'pedidos', nombre: 'Pedidos', descripcion: 'Historial de compras', icono: '📋', ruta: '/pedidos', color: '#10B981', soloAdmin: false },
  { id: 'usuarios', nombre: 'Usuarios', descripcion: 'Gestionar usuarios', icono: '👥', ruta: '/usuarios', color: '#F59E0B', soloAdmin: true },
  { id: 'ajustes', nombre: 'Ajustes', descripcion: 'Configuración de la app', icono: '⚙️', ruta: '/ajustes', color: '#6B7280', soloAdmin: false },
];
// #endregion

@Injectable({ providedIn: 'root' })
export class MainMenuViewModel {

  // #region Señales computadas
  /**
   * Módulos disponibles filtrados según el rol del usuario.
   * Los módulos marcados como soloAdmin se ocultan para empleados.
   *
   * @returns Array de módulos visibles para el usuario actual.
   */
  modulos = computed(() => {
    const isAdmin = this.authService.isAdmin();
    return MODULOS.filter(m => !m.soloAdmin || isAdmin);
  });

  /**
   * Nombre del usuario actualmente autenticado.
   * Se muestra como saludo personalizado en el menú.
   *
   * @returns Nombre del usuario o cadena vacía si no hay sesión activa.
   */
  nombreUsuario = computed(() => {
    const user = this.authService.getCurrentUser();
    return user ? user.nombre : '';
  });

  /**
   * Rol del usuario actualmente autenticado.
   * Se usa para mostrar información contextual en la UI.
   *
   * @returns Rol del usuario ('administrador' o 'empleado') o cadena vacía.
   */
  rolUsuario = computed(() => this.authService.getCurrentUser()?.rol || '');
  // #endregion

  // #region Constructor
  /**
   * @param authService - Servicio de autenticación para obtener datos del usuario y su rol.
   */
  constructor(private readonly authService: AuthService) {}
  // #endregion
}
