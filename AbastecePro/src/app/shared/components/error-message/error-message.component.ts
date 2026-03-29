/**
 * @fileoverview Componente de mensaje de error.
 * Muestra un mensaje de error visual con título, icono y opción de reintentar.
 */

// #region Imports
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
// #endregion

// #region Componente
@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  /** Mensaje descriptivo del error */
  @Input() message: string = 'Ha ocurrido un error al cargar los datos.';

  /** Título del panel de error */
  @Input() title: string = '¡Oops! Algo salió mal';

  /** Controla la visibilidad del botón de reintentar */
  @Input() showRetry: boolean = true;

  /** Icono o emoji mostrado junto al título */
  @Input() icon: string = '⚠️';

  /** Evento emitido cuando el usuario pulsa el botón de reintentar */
  @Output() retry = new EventEmitter<void>();

  /** Emite el evento de reintento al hacer click en el botón */
  onRetry(): void {
    this.retry.emit();
  }
}
// #endregion
