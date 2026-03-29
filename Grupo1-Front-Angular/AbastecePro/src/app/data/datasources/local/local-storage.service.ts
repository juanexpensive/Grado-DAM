/**
 * @fileoverview Servicio de almacenamiento local.
 * Encapsula el acceso a localStorage con manejo de errores,
 * serialización JSON automática y compatibilidad con SSR (Server-Side Rendering).
 */

// #region Imports
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// #endregion

// #region Servicio
@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  /** Indica si la app se está ejecutando en un navegador (vs SSR) */
  private isBrowser: boolean;

  /**
   * Constructor del servicio.
   * Detecta si se ejecuta en navegador o servidor para evitar errores SSR.
   * @param platformId - Token de plataforma inyectado por Angular
   */
  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Obtiene un valor del localStorage y lo deserializa.
   * @param key - Clave del valor a obtener
   * @returns El valor parseado desde JSON o null si no existe o hay error
   */
  get<T>(key: string): T | null {
    if (!this.isBrowser) return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) as T : null;
    } catch {
      return null;
    }
  }

  /**
   * Almacena un valor en localStorage serializándolo a JSON.
   * @param key - Clave bajo la cual almacenar el valor
   * @param value - Valor a almacenar (cualquier tipo serializable)
   */
  set<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('[LocalStorageService] Error al guardar:', e);
    }
  }

  /**
   * Elimina un valor específico del localStorage.
   * @param key - Clave del valor a eliminar
   */
  remove(key: string): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(key);
  }

  /**
   * Limpia todo el contenido del localStorage.
   * Elimina todas las claves y valores almacenados.
   */
  clear(): void {
    if (!this.isBrowser) return;
    localStorage.clear();
  }
}
// #endregion
