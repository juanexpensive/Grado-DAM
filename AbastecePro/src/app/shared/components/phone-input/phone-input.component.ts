/**
 * @fileoverview Componente de input de teléfono con selector de prefijo internacional.
 * Muestra banderas emoji y detecta automáticamente el prefijo del número existente.
 * Implementa ControlValueAccessor para integrarse con formularios reactivos de Angular.
 */

// #region Imports
import { Component, Input, Output, EventEmitter, OnInit, signal, computed, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
// #endregion

// #region Interfaces
/** Interfaz que define la estructura de un país con su prefijo telefónico */
export interface CountryPrefix {
  /** Código ISO del país (ej: 'ES') */
  code: string;
  /** Nombre del país en español */
  name: string;
  /** Prefijo telefónico internacional (ej: '+34') */
  prefix: string;
  /** Emoji de la bandera del país */
  flag: string;
}
// #endregion

// #region Datos de Países
/** Lista de países con sus prefijos telefónicos internacionales */
const COUNTRY_PREFIXES: CountryPrefix[] = [
  { code: 'ES', name: 'España', prefix: '+34', flag: '🇪🇸' },
  { code: 'MX', name: 'México', prefix: '+52', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', prefix: '+54', flag: '🇦🇷' },
  { code: 'CO', name: 'Colombia', prefix: '+57', flag: '🇨🇴' },
  { code: 'CL', name: 'Chile', prefix: '+56', flag: '🇨🇱' },
  { code: 'PE', name: 'Perú', prefix: '+51', flag: '🇵🇪' },
  { code: 'VE', name: 'Venezuela', prefix: '+58', flag: '🇻🇪' },
  { code: 'EC', name: 'Ecuador', prefix: '+593', flag: '🇪🇨' },
  { code: 'UY', name: 'Uruguay', prefix: '+598', flag: '🇺🇾' },
  { code: 'PY', name: 'Paraguay', prefix: '+595', flag: '🇵🇾' },
  { code: 'BO', name: 'Bolivia', prefix: '+591', flag: '🇧🇴' },
  { code: 'CR', name: 'Costa Rica', prefix: '+506', flag: '🇨🇷' },
  { code: 'PA', name: 'Panamá', prefix: '+507', flag: '🇵🇦' },
  { code: 'DO', name: 'Rep. Dominicana', prefix: '+1', flag: '🇩🇴' },
  { code: 'GT', name: 'Guatemala', prefix: '+502', flag: '🇬🇹' },
  { code: 'HN', name: 'Honduras', prefix: '+504', flag: '🇭🇳' },
  { code: 'SV', name: 'El Salvador', prefix: '+503', flag: '🇸🇻' },
  { code: 'NI', name: 'Nicaragua', prefix: '+505', flag: '🇳🇮' },
  { code: 'CU', name: 'Cuba', prefix: '+53', flag: '🇨🇺' },
  { code: 'PR', name: 'Puerto Rico', prefix: '+1', flag: '🇵🇷' },
  { code: 'US', name: 'Estados Unidos', prefix: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'Reino Unido', prefix: '+44', flag: '🇬🇧' },
  { code: 'FR', name: 'Francia', prefix: '+33', flag: '🇫🇷' },
  { code: 'DE', name: 'Alemania', prefix: '+49', flag: '🇩🇪' },
  { code: 'IT', name: 'Italia', prefix: '+39', flag: '🇮🇹' },
  { code: 'PT', name: 'Portugal', prefix: '+351', flag: '🇵🇹' },
  { code: 'BR', name: 'Brasil', prefix: '+55', flag: '🇧🇷' },
  { code: 'CN', name: 'China', prefix: '+86', flag: '🇨🇳' },
  { code: 'JP', name: 'Japón', prefix: '+81', flag: '🇯🇵' },
  { code: 'KR', name: 'Corea del Sur', prefix: '+82', flag: '🇰🇷' },
  { code: 'IN', name: 'India', prefix: '+91', flag: '🇮🇳' },
  { code: 'AU', name: 'Australia', prefix: '+61', flag: '🇦🇺' },
  { code: 'MA', name: 'Marruecos', prefix: '+212', flag: '🇲🇦' },
  { code: 'RO', name: 'Rumanía', prefix: '+40', flag: '🇷🇴' },
];
// #endregion

// #region Componente

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true,
    },
  ],
})
export class PhoneInputComponent implements ControlValueAccessor, OnInit {
  /** Lista completa de países con prefijos disponibles */
  countries = COUNTRY_PREFIXES;
  /** Signal con el país seleccionado actualmente */
  selectedCountry = signal<CountryPrefix>(COUNTRY_PREFIXES[0]);
  /** Signal con el número de teléfono sin prefijo */
  phoneNumber = signal('');
  /** Signal que controla la visibilidad del dropdown de países */
  dropdownOpen = signal(false);
  /** Signal con el texto de búsqueda para filtrar países */
  searchCountry = signal('');
  /** Indica si el componente está deshabilitado */
  disabled = false;

  /** Computed signal: lista de países filtrados por el texto de búsqueda */
  filteredCountries = computed(() => {
    const search = this.searchCountry().toLowerCase();
    if (!search) return this.countries;
    return this.countries.filter(
      c => c.name.toLowerCase().includes(search) || c.prefix.includes(search) || c.code.toLowerCase().includes(search)
    );
  });

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit(): void {}

  // #region ControlValueAccessor
  /**
   * Escribe el valor desde el formulario al componente.
   * Parsea el número para detectar el prefijo del país automáticamente.
   * @param value - Número de teléfono completo con prefijo
   */
  writeValue(value: string): void {
    if (!value) {
      this.phoneNumber.set('');
      return;
    }
    const parsed = this.parsePhoneNumber(value);
    this.selectedCountry.set(parsed.country);
    this.phoneNumber.set(parsed.number);
  }

  /**
   * Registra la función callback para notificar cambios al formulario.
   * @param fn - Función de callback proporcionada por Angular Forms
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Registra la función callback para notificar el evento touched.
   * @param fn - Función de callback proporcionada por Angular Forms
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Actualiza el estado deshabilitado del componente.
   * @param isDisabled - true si el componente debe deshabilitarse
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  // #endregion

  // #region Interacción con Dropdown
  /**
   * Selecciona un país del dropdown y emite el valor actualizado.
   * @param country - País seleccionado por el usuario
   */
  selectCountry(country: CountryPrefix): void {
    this.selectedCountry.set(country);
    this.dropdownOpen.set(false);
    this.searchCountry.set('');
    this.emitValue();
  }

  /** Alterna la visibilidad del dropdown de selección de país */
  toggleDropdown(): void {
    if (this.disabled) return;
    this.dropdownOpen.set(!this.dropdownOpen());
    if (this.dropdownOpen()) {
      this.searchCountry.set('');
    }
  }

  /** Cierra el dropdown al hacer click fuera del componente */
  closeDropdown(): void {
    this.dropdownOpen.set(false);
    this.searchCountry.set('');
  }
  // #endregion

  // #region Manejo del Input
  /**
   * Maneja los cambios en el campo de número de teléfono.
   * Limpia caracteres no numéricos (excepto espacios) y emite el valor.
   * @param value - Texto ingresado por el usuario
   */
  onPhoneChange(value: string): void {
    // Limpiar caracteres no numéricos (excepto espacios)
    const cleaned = value.replace(/[^\d\s]/g, '');
    this.phoneNumber.set(cleaned);
    this.emitValue();
  }

  /**
   * Emite el valor completo al formulario: prefijo + número.
   * Combina el prefijo del país seleccionado con el número local.
   */
  private emitValue(): void {
    const number = this.phoneNumber().trim();
    const fullNumber = number ? `${this.selectedCountry().prefix} ${number}` : '';
    this.onChange(fullNumber);
    this.onTouched();
  }

  /**
   * Parsea un número de teléfono completo para detectar el prefijo del país.
   * Ordena los prefijos por longitud descendente para encontrar la coincidencia más específica.
   * Si no detecta prefijo, asume España (+34) por defecto.
   * @param phone - Número de teléfono completo con posible prefijo
   * @returns Objeto con el país detectado y el número local sin prefijo
   */
  private parsePhoneNumber(phone: string): { country: CountryPrefix; number: string } {
    const cleaned = phone.replace(/\s+/g, ' ').trim();

    if (cleaned.startsWith('+')) {
      // Ordenar por longitud de prefijo descendente para match más específico primero
      const sorted = [...this.countries].sort((a, b) => b.prefix.length - a.prefix.length);
      for (const country of sorted) {
        if (cleaned.startsWith(country.prefix)) {
          const number = cleaned.slice(country.prefix.length).trim();
          return { country, number };
        }
      }
    }

    // Si no se detecta prefijo, devolver España por defecto con el número tal cual
    return { country: COUNTRY_PREFIXES[0], number: cleaned };
  }
  // #endregion
}
// #endregion
