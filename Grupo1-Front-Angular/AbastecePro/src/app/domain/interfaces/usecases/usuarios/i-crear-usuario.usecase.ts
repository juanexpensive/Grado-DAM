/**
 * @fileoverview Interfaz del caso de uso: Crear un nuevo usuario.
 * Registra un usuario en el sistema a partir del DTO proporcionado.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Usuario } from '../../../entities/usuario.entity';
import { CrearUsuarioDto } from '../../../dtos/usuario/crear-usuario.dto';
// #endregion

// #region Interfaz
/**
 * Contrato del caso de uso para crear un nuevo usuario.
 */
export interface ICrearUsuarioUseCase {
  /** Ejecuta la creación de un nuevo usuario */
  execute(usuario: CrearUsuarioDto): Observable<Usuario>;
}
// #endregion
