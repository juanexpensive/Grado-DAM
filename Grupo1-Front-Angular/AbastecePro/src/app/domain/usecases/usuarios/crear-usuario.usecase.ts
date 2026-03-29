/**
 * @fileoverview Caso de uso: Crear un nuevo usuario en el sistema.
 * Transforma el DTO de creación en la entidad Usuario y delega al repositorio.
 */

// #region Imports
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, RolUsuario } from '../../entities/usuario.entity';
import { CrearUsuarioDto } from '../../dtos/usuario/crear-usuario.dto';
import { IUsuarioRepository } from '../../interfaces/repositories/i-usuario.repository';
import { USUARIO_REPOSITORY_TOKEN } from '../../../di/types/injection.tokens';
// #endregion

// #region Caso de Uso
/**
 * Caso de uso que crea un nuevo usuario en el sistema.
 * Convierte el DTO de creación en una entidad Usuario (sin ID)
 * y delega la persistencia al repositorio inyectado.
 */
@Injectable({ providedIn: 'root' })
export class CrearUsuarioUseCase {
  /** @param usuarioRepo Repositorio de usuarios inyectado por token */
  constructor(@Inject(USUARIO_REPOSITORY_TOKEN) private readonly usuarioRepo: IUsuarioRepository) {}

  /**
   * Ejecuta la creación de un usuario a partir del DTO.
   * Construye la entidad sin ID (lo asigna el backend) con valores por defecto:
   * - idEmpresa: usa el del DTO o 1 por defecto
   * - firebaseUID: usa el del DTO o cadena vacía
   * - activo: siempre true al crear
   * @param dto - DTO con los datos del nuevo usuario
   * @returns Observable con el usuario creado (incluyendo ID asignado)
   */
  execute(dto: CrearUsuarioDto): Observable<Usuario> {
    const nuevoUsuario: Omit<Usuario, 'id'> = {
      nombre: dto.nombre,
      apellidos: dto.apellidos,
      correo: dto.correo,
      password: dto.password,
      telefono: dto.telefono,
      rol: dto.rol as RolUsuario,
      idEmpresa: dto.idEmpresa ?? 1,
      firebaseUID: dto.firebaseUID ?? '',
      activo: true,
    };
    return this.usuarioRepo.create(nuevoUsuario);
  }
}
// #endregion
