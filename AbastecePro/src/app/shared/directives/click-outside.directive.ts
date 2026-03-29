/**
 * @fileoverview Directiva Click Outside.
 * Emite un evento cuando el usuario hace click fuera del elemento host.
 * Útil para cerrar dropdowns, modales y menús contextuales.
 */

// #region Imports
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
// #endregion

// #region Directiva
@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  /** Evento emitido cuando se detecta un click fuera del elemento host */
  @Output() clickOutside = new EventEmitter<void>();

  /**
   * Constructor de la directiva.
   * @param elementRef - Referencia al elemento DOM del host
   */
  constructor(private readonly elementRef: ElementRef) {}

  /**
   * Escucha clicks en el documento y comprueba si ocurren fuera del host.
   * @param target - Elemento objetivo del evento de click
   */
  @HostListener('document:click', ['$event.target'])
  onClick(target: EventTarget | null): void {
    if (target && !this.elementRef.nativeElement.contains(target)) {
      this.clickOutside.emit();
    }
  }
}
// #endregion
