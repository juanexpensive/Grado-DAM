/**
 * @fileoverview Componente de Skeleton Loading.
 * Muestra placeholders animados (shimmer) mientras los datos se están cargando,
 * mejorando la percepción de rendimiento. Configurable en tipo y cantidad.
 */

// #region Imports
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// #endregion

// #region Componente
@Component({
  selector: 'app-skeleton-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton-loading.component.html',
  styleUrls: ['./skeleton-loading.component.scss'],
})
export class SkeletonLoadingComponent {
  /** Tipo de skeleton a renderizar: tarjeta, lista, texto, círculo o tabla */
  @Input() type: 'card' | 'list' | 'text' | 'circle' | 'table' = 'card';

  /** Número de elementos skeleton a mostrar */
  @Input() count: number = 3;

  /** Ancho personalizado del skeleton (solo para text y circle) */
  @Input() width: string = '100%';

  /** Altura personalizada del skeleton (solo para text) */
  @Input() height: string = '1rem';

  /**
   * Genera un array auxiliar para iterar en el template.
   * @returns Array de índices numéricos [0, 1, ..., count-1]
   */
  get items(): number[] {
    return Array.from({ length: this.count }, (_, i) => i);
  }
}
// #endregion
