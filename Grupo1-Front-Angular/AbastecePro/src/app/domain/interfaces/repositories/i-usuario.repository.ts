/**
 * @fileoverview Interfaz del repositorio de Usuarios.
 * Define el contrato que deben cumplir las implementaciones
 * (tanto mock local como API remota).
 */

// #region Imports
import { Observable } from 'rxjs';
import { Usuario } from '../../entities/usuario.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del repositorio de usuarios.
 * Define operaciones CRUD y búsqueda por correo electrónico.
 */
export interface IUsuarioRepository {
  /** Obtiene todos los usuarios */
  getAll(): Observable<Usuario[]>;

  /** Obtiene un usuario por su ID */
  getById(id: number): Observable<Usuario>;

  /** Busca un usuario por correo electrónico */
  getByEmail(correo: string): Observable<Usuario | null>;

  /** Crea un nuevo usuario */
  create(usuario: Omit<Usuario, 'id'>): Observable<Usuario>;

  /** Actualiza un usuario existente */
  update(usuario: Usuario): Observable<Usuario>;

  /** Elimina un usuario por su ID */
  delete(id: number): Observable<boolean>;
}
// #endregion
