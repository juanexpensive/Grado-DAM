/**
 * @fileoverview Caso de uso: Obtener un usuario por su ID.
 * Busca y devuelve un usuario específico del sistema.
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
 * Caso de uso que busca un usuario específico por su identificador.
 * Delega la consulta al repositorio de usuarios inyectado.
 */
@Injectable({ providedIn: 'root' })
export class GetUsuarioByIdUseCase {
  /** @param usuarioRepo Repositorio de usuarios inyectado por token */
  constructor(@Inject(USUARIO_REPOSITORY_TOKEN) private readonly usuarioRepo: IUsuarioRepository) {}

  /**
   * Ejecuta la búsqueda de un usuario por su identificador.
   * @param id - Identificador único del usuario
   * @returns Observable con el usuario encontrado
   */
  execute(id: number): Observable<Usuario> {
    return this.usuarioRepo.getById(id);
  }
}
// #endregion
