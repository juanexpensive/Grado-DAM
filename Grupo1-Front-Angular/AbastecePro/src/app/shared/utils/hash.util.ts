/**
 * @fileoverview Utilidad de hashing de contraseñas.
 * Proporciona funciones para hashear contraseñas usando SHA-256
 * a través de la Web Crypto API nativa del navegador.
 */

// #region Funciones
/**
 * Hashea una contraseña usando el algoritmo SHA-256.
 * Utiliza la Web Crypto API (crypto.subtle) disponible en navegadores modernos.
 * @param password - Contraseña en texto plano a hashear
 * @returns Promesa con el hash hexadecimal de la contraseña (64 caracteres)
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
// #endregion
