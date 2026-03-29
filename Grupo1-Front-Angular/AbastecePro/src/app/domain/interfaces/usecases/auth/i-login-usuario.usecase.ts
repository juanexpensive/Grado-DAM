/**
 * @fileoverview Interfaz del caso de uso: Iniciar sesión de usuario.
 * Autentica un usuario mediante correo y contraseña.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Usuario } from '../../../entities/usuario.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para el inicio de sesión.
 */
export interface ILoginUsuarioUseCase {
  /** Ejecuta el inicio de sesión y devuelve el usuario autenticado o null si falla */
  execute(correo: string, password: string): Observable<Usuario | null>;
}
// #endregion
