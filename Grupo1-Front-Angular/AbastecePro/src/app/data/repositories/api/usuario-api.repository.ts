/**
 * Implementación API del repositorio de Usuarios.
 *
 * Conecta con el backend ASP.NET a través de la API REST para gestionar
 * los usuarios del sistema (administradores y empleados).
 *
 * Incluye lógica de mapeo para convertir los roles numéricos de la API
 * (0=administrador, 1=empleado) al formato string del dominio,
 * y para normalizar el campo firebaseUID que puede venir como snake_case.
 */

// #region Imports
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { IUsuarioRepository } from '../../../domain/interfaces/repositories/i-usuario.repository';
import { Usuario, RolUsuario } from '../../../domain/entities/usuario.entity';
import { ApiConnectionService } from '../../datasources/api/api-connection.service';
import { ENDPOINTS } from '../../datasources/api/endpoints.constants';
// #endregion

// #region Mapeo de roles
/** Mapeo de valor numérico (API) a string del dominio para el rol del usuario */
const ROL_MAP: Record<number, RolUsuario> = {
  0: 'administrador',
  1: 'empleado',
};

/** Mapeo inverso: de string del dominio a valor numérico para enviar a la API */
const ROL_TO_API: Record<RolUsuario, number> = {
  administrador: 0,
  empleado: 1,
};
// #endregion

// #region Funciones auxiliares
/**
 * Convierte un usuario crudo recibido de la API al formato del dominio.
 * Normaliza el rol de numérico a string y unifica el campo firebaseUID
 * que puede venir como 'firebase_uid' o 'firebaseUID'.
 *
 * @param raw - Objeto crudo del usuario recibido de la API.
 * @returns Entidad Usuario con formato normalizado del dominio.
 */
function mapUsuario(raw: any): Usuario {
  return {
    ...raw,
    rol: typeof raw.rol === 'number' ? (ROL_MAP[raw.rol] ?? 'empleado') : raw.rol,
    firebaseUID: raw.firebase_uid ?? raw.firebaseUID ?? '',
  };
}
// #endregion

@Injectable()
export class UsuarioApiRepository implements IUsuarioRepository {

  // #region Constructor
  /**
   * @param api - Servicio de conexión a la API para realizar peticiones HTTP.
   */
  constructor(private readonly api: ApiConnectionService) {}
  // #endregion

  // #region Métodos públicos
  /**
   * Obtiene todos los usuarios desde la API.
   *
   * @returns Observable con la lista completa de usuarios con roles normalizados.
   */
  getAll(): Observable<Usuario[]> {
    return this.api.get<any[]>(ENDPOINTS.USUARIOS.BASE).pipe(
      map(users => users.map(mapUsuario))
    );
  }

  /**
   * Obtiene un usuario por su identificador.
   *
   * @param id - ID del usuario a buscar.
   * @returns Observable con el usuario encontrado y normalizado.
   */
  getById(id: number): Observable<Usuario> {
    return this.api.get<any>(ENDPOINTS.USUARIOS.BY_ID(id)).pipe(
      map(mapUsuario)
    );
  }

  /**
   * Busca un usuario por su correo electrónico.
   * Obtiene todos los usuarios y filtra por correo localmente.
   *
   * @param correo - Correo electrónico del usuario a buscar.
   * @returns Observable con el usuario encontrado o null si no existe.
   */
  getByEmail(correo: string): Observable<Usuario | null> {
    return this.api.get<any[]>(ENDPOINTS.USUARIOS.BASE).pipe(
      map(users => {
        const found = users.find(u => u.correo === correo);
        return found ? mapUsuario(found) : null;
      })
    );
  }

  /**
   * Crea un nuevo usuario en el backend.
   * Convierte el rol a formato numérico y el firebaseUID a snake_case
   * para cumplir con el formato esperado por la API.
   *
   * @param usuario - Datos del usuario a crear (sin ID).
   * @returns Observable con el usuario creado normalizado.
   */
  create(usuario: Omit<Usuario, 'id'>): Observable<Usuario> {
    // Construye el payload con el formato que espera la API
    const payload = {
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      telefono: usuario.telefono,
      rol: ROL_TO_API[usuario.rol as RolUsuario] ?? 1,
      firebase_uid: usuario.firebaseUID,
      activo: usuario.activo,
    };
    return this.api.post<any>(ENDPOINTS.USUARIOS.BASE, payload).pipe(
      map(raw => raw ? mapUsuario(raw) : usuario as Usuario)
    );
  }

  /**
   * Actualiza un usuario existente en el backend.
   * Convierte el rol a formato numérico y normaliza los campos.
   *
   * @param usuario - Datos completos del usuario con ID.
   * @returns Observable con el usuario actualizado normalizado.
   */
  update(usuario: Usuario): Observable<Usuario> {
    // Construye el payload con el formato que espera la API
    const payload = {
      id: usuario.id,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      telefono: usuario.telefono,
      rol: ROL_TO_API[usuario.rol as RolUsuario] ?? 1,
      firebase_uid: usuario.firebaseUID,
      activo: usuario.activo,
    };
    return this.api.put<any>(ENDPOINTS.USUARIOS.BY_ID(usuario.id), payload).pipe(
      map(raw => raw ? mapUsuario(raw) : mapUsuario(payload))
    );
  }

  /**
   * Elimina un usuario por su ID.
   *
   * @param id - ID del usuario a eliminar.
   * @returns Observable con true si se eliminó correctamente.
   */
  delete(id: number): Observable<boolean> {
    return this.api.delete<void>(ENDPOINTS.USUARIOS.BY_ID(id)).pipe(map(() => true));
  }
  // #endregion
}
