/**
 * @fileoverview Caso de uso: Buscar usuario por correo.
 * Tras autenticar con Firebase, obtiene los datos del usuario desde la API.
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
 * Caso de uso que busca un usuario por su correo electrónico.
 * Utilizado después de la autenticación con Firebase para obtener
 * los datos completos del usuario desde el backend.
 */
@Injectable({ providedIn: 'root' })
export class LoginUsuarioUseCase {
  /** @param usuarioRepo Repositorio de usuarios inyectado por token */
  constructor(@Inject(USUARIO_REPOSITORY_TOKEN) private readonly usuarioRepo: IUsuarioRepository) {}

  /**
   * Busca un usuario por su correo electrónico en el repositorio.
   * @param correo - Correo electrónico del usuario a buscar
   * @returns Observable con el usuario encontrado o null si no existe
   */
  execute(correo: string): Observable<Usuario | null> {
    return this.usuarioRepo.getByEmail(correo);
  }
}
// #endregion
