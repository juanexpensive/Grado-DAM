/**
 * @fileoverview Pipe de formato de moneda.
 * Transforma un valor numérico en una cadena formateada como moneda euro (€)
 * usando la localización española (Intl.NumberFormat).
 */

// #region Imports
import { Pipe, PipeTransform } from '@angular/core';
// #endregion

// #region Pipe
@Pipe({
  name: 'currencyFormat',
  standalone: true,
})
export class CurrencyFormatPipe implements PipeTransform {
  /**
   * Transforma un valor numérico a formato de moneda euro.
   * @param value - El valor numérico a formatear (puede ser null o undefined)
   * @param decimals - Número de decimales a mostrar (por defecto 2)
   * @returns La cadena formateada, ej: "1.234,50 €". Devuelve "0,00 €" si el valor es nulo.
   */
  transform(value: number | null | undefined, decimals: number = 2): string {
    if (value === null || value === undefined) {
      return '0,00 €';
    }

    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }
}
// #endregion
