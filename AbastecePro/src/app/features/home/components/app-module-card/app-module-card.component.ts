/**
 * @fileoverview Componente reutilizable de tarjeta de módulo.
 * Representa un acceso directo visual a un módulo de la aplicación
 * con icono, nombre y color personalizables.
 */

// #region Imports
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
// #endregion

// #region Componente
@Component({
  selector: 'app-module-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="module-card-item" (click)="clicked.emit()" [style.--card-color]="color">
      <div class="module-card-item__icon" [style.background]="color + '15'">
        <span>{{ icono }}</span>
      </div>
      <span class="module-card-item__label">{{ nombre }}</span>
    </button>
  `,
  styles: [`
    .module-card-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      padding: 1.5rem;
      border: none;
      border-radius: 16px;
      background: var(--surface-color);
      cursor: pointer;
      transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
      font-family: inherit;
    }

    .module-card-item:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
    }

    .module-card-item__icon {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .module-card-item__label {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-primary);
    }
  `],
})
export class AppModuleCardComponent {
  /** Nombre del módulo mostrado bajo el icono */
  @Input() nombre: string = '';
  /** Emoji o carácter representativo del módulo */
  @Input() icono: string = '';
  /** Color temático de la tarjeta (hex). Se usa para el fondo del icono */
  @Input() color: string = '#0D7377';
  /** Evento emitido al hacer clic en la tarjeta */
  @Output() clicked = new EventEmitter<void>();
}
// #endregion
