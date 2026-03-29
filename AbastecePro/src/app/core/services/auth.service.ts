/**
 * Servicio principal de autenticación.
 *
 * Gestiona el ciclo de vida de la sesión del usuario:
 * - Login con Firebase Authentication + consulta a la API para obtener datos del usuario.
 * - Persistencia de sesión en localStorage.
 * - Cierre de sesión (Firebase + localStorage).
 * - Consultas de rol y estado de autenticación.
 *
 * Expone el usuario actual tanto como Signal (para ViewModels con computed)
 * como Observable (para componentes que usen async pipe).
 */

// #region Imports
import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { Usuario } from '../../domain/entities/usuario.entity';
import { IUsuarioRepository } from '../../domain/interfaces/repositories/i-usuario.repository';
import { USUARIO_REPOSITORY_TOKEN } from '../../di/types/injection.tokens';
import { FirebaseService } from './firebase.service';
// #endregion

// #region Constantes
/** Clave utilizada para almacenar los datos del usuario en localStorage */
const STORAGE_KEY = 'currentUser';
// #endregion

@Injectable({ providedIn: 'root' })
export class AuthService {

  // #region Señales y estado reactivo
  /**
   * Signal privado con los datos del usuario autenticado.
   * Se usa internamente para actualizar el estado; externamente se
   * expone como señal de solo lectura mediante `currentUser`.
   */
  private _currentUser = signal<Usuario | null>(null);

  /** Signal de solo lectura del usuario actual (para signals computados en ViewModels) */
  readonly currentUser = this._currentUser.asReadonly();

  /**
   * BehaviorSubject que mantiene el estado del usuario actual.
   * Permite suscripciones reactivas mediante el observable `currentUser$`.
   */
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);

  /** Observable público del usuario actual para componentes que usen async pipe */
  public currentUser$: Observable<Usuario | null> = this.currentUserSubject.asObservable();
  // #endregion

  // #region Propiedades privadas
  /** Indica si la aplicación se ejecuta en el navegador (para acceder a localStorage) */
  private isBrowser: boolean;
  // #endregion

  // #region Constructor
  /**
   * Inicializa el servicio cargando el usuario previamente almacenado en localStorage.
   *
   * @param usuarioRepo - Repositorio de usuarios para consultar datos del usuario por correo.
   * @param platformId - Token de plataforma para detectar si estamos en el navegador.
   * @param firebaseService - Servicio de Firebase para autenticación con correo/contraseña.
   */
  constructor(
    @Inject(USUARIO_REPOSITORY_TOKEN) private readonly usuarioRepo: IUsuarioRepository,
    @Inject(PLATFORM_ID) platformId: object,
    private readonly firebaseService: FirebaseService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadStoredUser();
  }
  // #endregion

  // #region Métodos privados
  /**
   * Carga el usuario almacenado en localStorage al iniciar la aplicación.
   * Si los datos están corruptos, limpia la clave de localStorage.
   * Solo opera en el navegador (no en SSR).
   */
  private loadStoredUser(): void {
    if (!this.isBrowser) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const user: Usuario = JSON.parse(stored);
        this._currentUser.set(user);
        this.currentUserSubject.next(user);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  /**
   * Traduce los códigos de error de Firebase Authentication a mensajes amigables en español.
   *
   * @param code - Código de error de Firebase (ej: 'auth/wrong-password').
   * @returns Mensaje de error traducido al español.
   */
  private mapFirebaseError(code: string | undefined): string {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Credenciales incorrectas. Verifica tu correo y contraseña.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Inténtalo más tarde.';
      case 'auth/user-disabled':
        return 'Esta cuenta ha sido deshabilitada.';
      case 'auth/network-request-failed':
        return 'Error de conexión. Verifica tu red.';
      default:
        return 'Error al iniciar sesión. Inténtalo de nuevo.';
    }
  }
  // #endregion

  // #region Métodos públicos
  /**
   * Inicia sesión con correo y contraseña.
   *
   * Flujo:
   * 1. Autentica con Firebase Authentication (correo + contraseña).
   * 2. Obtiene los datos completos del usuario desde la API por correo.
   * 3. Almacena el usuario en localStorage y actualiza el estado reactivo.
   *
   * En caso de error, traduce los códigos de Firebase a mensajes en español.
   *
   * @param correo - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @returns Observable con los datos del usuario autenticado o null.
   */
  login(correo: string, password: string): Observable<Usuario | null> {
    return from(this.firebaseService.login(correo, password)).pipe(
      switchMap(() => this.usuarioRepo.getByEmail(correo)),
      tap((user) => {
        if (user && this.isBrowser) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          this._currentUser.set(user);
          this.currentUserSubject.next(user);
        }
      }),
      catchError((error) => {
        console.error('[AuthService] Error en login:', error);
        // Los errores de Firebase tienen propiedad 'code' (ej. auth/wrong-password)
        if (error?.code?.startsWith('auth/')) {
          throw new Error(this.mapFirebaseError(error.code));
        }
        // Errores de la API u otros errores genéricos
        const apiMsg = error?.message || 'Error al iniciar sesión. Inténtalo de nuevo.';
        throw new Error(apiMsg);
      })
    );
  }

  /**
   * Cierra la sesión del usuario actual.
   *
   * Realiza tres acciones:
   * 1. Cierra sesión en Firebase Authentication.
   * 2. Elimina los datos del usuario de localStorage.
   * 3. Resetea el estado reactivo (signal y BehaviorSubject) a null.
   */
  logout(): void {
    this.firebaseService.logout();
    if (this.isBrowser) {
      localStorage.removeItem(STORAGE_KEY);
    }
    this._currentUser.set(null);
    this.currentUserSubject.next(null);
  }

  /**
   * Obtiene los datos del usuario actual de forma síncrona.
   *
   * @returns Datos del usuario autenticado o null si no hay sesión activa.
   */
  getCurrentUser(): Usuario | null {
    return this._currentUser();
  }

  /**
   * Verifica si hay un usuario autenticado en la sesión actual.
   *
   * @returns true si hay un usuario autenticado, false en caso contrario.
   */
  isAuthenticated(): boolean {
    return this._currentUser() !== null;
  }

  /**
   * Verifica si el usuario actual tiene el rol de administrador.
   *
   * @returns true si el usuario tiene rol 'administrador', false en caso contrario.
   */
  isAdmin(): boolean {
    return this._currentUser()?.rol === 'administrador';
  }

  /**
   * Actualiza los datos del usuario actual en memoria y en localStorage.
   * Se usa, por ejemplo, tras editar el perfil del usuario.
   *
   * @param user - Datos actualizados del usuario.
   */
  updateCurrentUser(user: Usuario): void {
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
    this._currentUser.set(user);
    this.currentUserSubject.next(user);
  }
  // #endregion
}
