/**
 * @fileoverview Caso de uso: Actualizar los datos de un usuario existente.
 * Envía la entidad modificada al repositorio para persistir los cambios.
 */

// #region Imports
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../entities/usuario.entity';
import { IUsuarioRepository } from '../../interfaces/repositories/i-usuario.repository';
import { USUARIO_REPOSITORY_TOKEN } from '../../../di/types/injection.tokens';
// #endregion

// #region Caso de Uso
/**
 * Caso de uso que actualiza los datos de un usuario existente.
 * Delega la operación de actualización al repositorio de usuarios.
 */
@Injectable({ providedIn: 'root' })
export class ActualizarUsuarioUseCase {
  /** @param usuarioRepo Repositorio de usuarios inyectado por token */
  constructor(@Inject(USUARIO_REPOSITORY_TOKEN) private readonly usuarioRepo: IUsuarioRepository) {}

  /**
   * Ejecuta la actualización de un usuario.
   * @param usuario - Entidad de usuario con los datos actualizados
   * @returns Observable con el usuario actualizado desde el backend
   */
  execute(usuario: Usuario): Observable<Usuario> {
    return this.usuarioRepo.update(usuario);
  }
}
// #endregion
