/**
 * @fileoverview DTO para la creación de usuarios.
 * Estructura con los datos necesarios para registrar un nuevo usuario en el sistema.
 */

// #region DTO
/** DTO con los datos requeridos para crear un nuevo usuario */
export interface CrearUsuarioDto {
  /** Nombre del usuario */
  nombre: string;
  /** Apellidos del usuario */
  apellidos: string;
  /** Correo electrónico (usado también como login) */
  correo: string;
  /** Contraseña en texto plano (se hasheará en el backend) */
  password: string;
  /** Teléfono de contacto */
  telefono: string;
  /** Rol asignado al usuario ('administrador' o 'empleado') */
  rol: string;
  /** ID de la empresa a la que pertenecerá (opcional) */
  idEmpresa?: number;
  /** UID de Firebase Authentication (asignado tras crear la cuenta) */
  firebaseUID?: string;
}
// #endregion
