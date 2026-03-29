/**
 * @fileoverview Caso de uso: Obtener todos los usuarios del sistema.
 * Devuelve la lista completa de usuarios registrados.
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
 * Caso de uso que recupera todos los usuarios del sistema.
 * Delega la consulta al repositorio de usuarios inyectado.
 */
@Injectable({ providedIn: 'root' })
export class GetAllUsuariosUseCase {
  /** @param usuarioRepo Repositorio de usuarios inyectado por token */
  constructor(@Inject(USUARIO_REPOSITORY_TOKEN) private readonly usuarioRepo: IUsuarioRepository) {}

  /**
   * Ejecuta la obtención de todos los usuarios.
   * @returns Observable con el listado completo de usuarios
   */
  execute(): Observable<Usuario[]> {
    return this.usuarioRepo.getAll();
  }
}
// #endregion
