/**
 * Servicio de Firebase.
 *
 * Inicializa y gestiona la instancia de Firebase Authentication.
 * Proporciona métodos para:
 * - Iniciar sesión con correo/contraseña.
 * - Crear nuevos usuarios (usando una app secundaria para preservar la sesión admin).
 * - Eliminar usuarios (rollback en caso de fallo en la API).
 * - Cerrar sesión.
 *
 * Utiliza una única instancia singleton de FirebaseApp en toda la aplicación.
 * Solo se inicializa en el navegador (no en SSR).
 */

// #region Imports
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { initializeApp, FirebaseApp, getApps, getApp, deleteApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { environment } from '../../../environments/environment';
// #endregion

@Injectable({ providedIn: 'root' })
export class FirebaseService {

  // #region Propiedades privadas
  /** Instancia de la aplicación Firebase, null si no se ha inicializado */
  private app: FirebaseApp | null = null;

  /** Instancia de Firebase Authentication, null si no se ha inicializado */
  private authInstance: Auth | null = null;

  /** Indica si la aplicación se ejecuta en el navegador */
  private isBrowser: boolean;
  // #endregion

  // #region Constructor
  /**
   * Inicializa Firebase solo cuando se ejecuta en el navegador.
   *
   * @param platformId - Token de plataforma para detectar navegador vs servidor.
   */
  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.initializeFirebase();
    }
  }
  // #endregion

  // #region Métodos privados
  /**
   * Inicializa la aplicación de Firebase con las credenciales del entorno.
   * Si ya existe una app inicializada, reutiliza esa instancia.
   * Obtiene la instancia de Auth para operaciones de autenticación.
   */
  private initializeFirebase(): void {
    try {
      this.app = getApps().length
        ? getApp()
        : initializeApp(environment.firebase);
      this.authInstance = getAuth(this.app);
    } catch (error) {
      console.error('Error al inicializar Firebase:', error);
    }
  }
  // #endregion

  // #region Propiedades públicas
  /**
   * Getter para obtener la instancia de Firebase Auth.
   *
   * @returns Instancia de Auth o null si Firebase no se ha inicializado.
   */
  get auth(): Auth | null {
    return this.authInstance;
  }
  // #endregion

  // #region Métodos públicos
  /**
   * Inicia sesión con correo y contraseña en Firebase Authentication.
   *
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @returns Promesa con las credenciales del usuario autenticado.
   * @throws Error si Firebase Auth no está disponible.
   */
  async login(email: string, password: string): Promise<UserCredential> {
    if (!this.authInstance) {
      throw new Error('Firebase Auth no está disponible.');
    }
    return signInWithEmailAndPassword(this.authInstance, email, password);
  }

  /**
   * Crea un nuevo usuario en Firebase Authentication.
   *
   * Utiliza una app secundaria temporal para evitar cerrar la sesión
   * del administrador que está creando el usuario. La app secundaria
   * se elimina automáticamente tras la operación (bloque finally).
   *
   * @param email - Correo electrónico del nuevo usuario.
   * @param password - Contraseña del nuevo usuario.
   * @returns Promesa con las credenciales del usuario creado.
   * @throws Error si no se ejecuta en el navegador.
   */
  async createUser(email: string, password: string): Promise<UserCredential> {
    if (!this.isBrowser) {
      throw new Error('Firebase Auth no está disponible en el servidor.');
    }
    // Crear app secundaria para no afectar la sesión actual del admin
    const secondaryApp = initializeApp(environment.firebase, 'secondary');
    try {
      const secondaryAuth = getAuth(secondaryApp);
      const credential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
      return credential;
    } finally {
      // Siempre eliminar la app secundaria para liberar recursos
      await deleteApp(secondaryApp);
    }
  }

  /**
   * Elimina un usuario de Firebase Authentication usando sus credenciales.
   *
   * Se usa como mecanismo de rollback cuando el guardado en la API falla
   * después de haber creado el usuario en Firebase. Utiliza una app
   * secundaria con nombre único (timestamp) para evitar colisiones.
   *
   * @param email - Correo del usuario a eliminar.
   * @param password - Contraseña del usuario (para re-autenticar y eliminar).
   */
  async deleteUser(email: string, password: string): Promise<void> {
    if (!this.isBrowser) return;
    // App secundaria con nombre único para evitar colisiones
    const secondaryApp = initializeApp(environment.firebase, `secondary-delete-${Date.now()}`);
    try {
      const secondaryAuth = getAuth(secondaryApp);
      // Re-autenticar y eliminar el usuario
      const credential = await signInWithEmailAndPassword(secondaryAuth, email, password);
      await credential.user.delete();
    } finally {
      await deleteApp(secondaryApp);
    }
  }

  /**
   * Cierra la sesión actual en Firebase Authentication.
   * No hace nada si Auth no está inicializado.
   */
  async logout(): Promise<void> {
    if (this.authInstance) {
      await signOut(this.authInstance);
    }
  }
  // #endregion
}
