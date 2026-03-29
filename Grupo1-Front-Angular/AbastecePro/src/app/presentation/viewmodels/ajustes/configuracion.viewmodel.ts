/**
 * ViewModel para la pantalla de configuración/ajustes.
 *
 * Gestiona las preferencias visuales del usuario:
 * - Tema de la aplicación (claro/oscuro/otros).
 * - Fondo de pantalla decorativo.
 * - Cierre de sesión.
 *
 * Las preferencias se persisten en localStorage para mantenerlas entre sesiones.
 */

// #region Imports
import { Injectable, Inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { STORAGE_KEYS, WALLPAPERS, THEMES } from '../../../shared/constants/app.constants';
import { TemaViewModel } from '../../models/tema-view.model';
import { FondoPantallaViewModel } from '../../models/fondo-pantalla-view.model';
// #endregion

@Injectable({ providedIn: 'root' })
export class ConfiguracionViewModel {

  // #region Señales de estado
  /** ID del tema actualmente seleccionado (por defecto 'light') */
  temaActual = signal<string>('light');

  /** ID del fondo de pantalla actualmente seleccionado (por defecto 1) */
  fondoActual = signal<number>(1);

  /** Lista de temas disponibles con su estado de selección */
  temas = signal<TemaViewModel[]>([]);

  /** Lista de fondos de pantalla disponibles con su estado de selección */
  fondos = signal<FondoPantallaViewModel[]>([]);
  // #endregion

  // #region Propiedades privadas
  /** Indica si la aplicación se ejecuta en el navegador (para acceder a localStorage y DOM) */
  private isBrowser: boolean;
  // #endregion

  // #region Constructor
  /**
   * Inicializa el ViewModel cargando las preferencias guardadas en localStorage.
   *
   * @param authService - Servicio de autenticación para obtener datos del usuario y cerrar sesión.
   * @param router - Router de Angular para redirigir tras cerrar sesión.
   * @param platformId - Token de plataforma para detectar si estamos en el navegador.
   */
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadSettings();
  }
  // #endregion

  // #region Métodos privados
  /**
   * Carga las preferencias de tema y fondo desde localStorage.
   * Si no existen, usa los valores por defecto ('light' y fondo 1).
   * Solo opera en el navegador (no en SSR).
   */
  private loadSettings(): void {
    if (!this.isBrowser) return;
    const tema = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    const fondo = parseInt(localStorage.getItem(STORAGE_KEYS.WALLPAPER) || '1', 10);
    this.temaActual.set(tema);
    this.fondoActual.set(fondo);
    this.updateTemasArray();
    this.updateFondosArray();
  }

  /**
   * Regenera el array de temas marcando cuál es el activo.
   * Se llama tras cada cambio de tema para actualizar la UI.
   */
  private updateTemasArray(): void {
    this.temas.set(THEMES.map(t => ({
      id: t.id,
      nombre: t.nombre,
      icono: t.icono,
      activo: t.id === this.temaActual(),
    })));
  }

  /**
   * Regenera el array de fondos de pantalla marcando cuál está seleccionado.
   * Se llama tras cada cambio de fondo para actualizar la UI.
   */
  private updateFondosArray(): void {
    this.fondos.set(WALLPAPERS.map(w => ({
      id: w.id,
      nombre: w.nombre,
      archivo: w.archivo,
      seleccionado: w.id === this.fondoActual(),
      previewUrl: w.gradiente,
    })));
  }
  // #endregion

  // #region Métodos públicos
  /**
   * Cambia el tema de la aplicación.
   * Persiste la selección en localStorage y aplica el atributo data-theme al DOM.
   *
   * @param temaId - Identificador del tema a aplicar (ej: 'light', 'dark').
   */
  cambiarTema(temaId: string): void {
    this.temaActual.set(temaId);
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEYS.THEME, temaId);
      document.documentElement.setAttribute('data-theme', temaId);
    }
    this.updateTemasArray();
  }

  /**
   * Cambia el fondo de pantalla decorativo de la aplicación.
   * Persiste la selección en localStorage.
   *
   * @param fondoId - Identificador numérico del fondo a aplicar.
   */
  cambiarFondo(fondoId: number): void {
    this.fondoActual.set(fondoId);
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEYS.WALLPAPER, fondoId.toString());
    }
    this.updateFondosArray();
  }

  /**
   * Cierra la sesión del usuario actual.
   * Limpia los datos de sesión mediante AuthService y redirige al login.
   */
  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Obtiene los datos del usuario actualmente autenticado.
   *
   * @returns Datos del usuario actual o null si no hay sesión activa.
   */
  get usuarioActual() {
    return this.authService.getCurrentUser();
  }
  // #endregion
}
