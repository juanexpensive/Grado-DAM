/**
 * @fileoverview Caso de uso: Eliminar un usuario del sistema.
 * Borra el usuario del repositorio por su identificador.
 */

// #region Imports
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuarioRepository } from '../../interfaces/repositories/i-usuario.repository';
import { USUARIO_REPOSITORY_TOKEN } from '../../../di/types/injection.tokens';
// #endregion

// #region Caso de Uso
/**
 * Caso de uso que elimina un usuario del sistema.
 * Delega la operación de borrado al repositorio de usuarios.
 */
@Injectable({ providedIn: 'root' })
export class EliminarUsuarioUseCase {
  /** @param usuarioRepo Repositorio de usuarios inyectado por token */
  constructor(@Inject(USUARIO_REPOSITORY_TOKEN) private readonly usuarioRepo: IUsuarioRepository) {}

  /**
   * Ejecuta la eliminación de un usuario por su ID.
   * @param id - Identificador del usuario a eliminar
   * @returns Observable con true si la eliminación fue exitosa
   */
  execute(id: number): Observable<boolean> {
    return this.usuarioRepo.delete(id);
  }
}
// #endregion
