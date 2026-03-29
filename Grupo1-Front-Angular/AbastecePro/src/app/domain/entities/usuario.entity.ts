/**
 * @fileoverview Entidad de Usuario.
 * Representa un usuario registrado en el ERP con su rol asignado.
 */

// #region Tipos
/** Roles disponibles en el sistema */
export type RolUsuario = 'administrador' | 'empleado';
// #endregion

// #region Entidad
/** Interfaz que define la estructura de un usuario del sistema */
export interface Usuario {
  /** Identificador único del usuario */
  id: number;
  /** Nombre del usuario */
  nombre: string;
  /** Apellidos del usuario */
  apellidos: string;
  /** Correo electrónico (también usado como login) */
  correo: string;
  /** Contraseña hasheada */
  password: string;
  /** Teléfono de contacto */
  telefono: string;
  /** Rol del usuario en el sistema */
  rol: RolUsuario;
  /** ID de la empresa a la que pertenece */
  idEmpresa: number;
  /** UID de Firebase Authentication */
  firebaseUID: string;
  /** Indica si el usuario está activo */
  activo: boolean;
}
// #endregion
