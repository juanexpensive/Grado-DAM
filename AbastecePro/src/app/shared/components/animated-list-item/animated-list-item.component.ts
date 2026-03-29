/**
 * @fileoverview Componente de item de lista animado.
 * Envuelve contenido para aplicar una animación de entrada con delay
 * progresivo (stagger effect), creando un efecto visual escalonado.
 */

// #region Imports
import { Component, Input, ElementRef, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ANIMATION_DURATION, STAGGER_DELAY, ANIMATION_EASING } from '../../constants/animation.constants';
// #endregion

// #region Componente
@Component({
  selector: 'app-animated-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-list-item.component.html',
  styleUrls: ['./animated-list-item.component.scss'],
})
export class AnimatedListItemComponent implements OnInit {
  /** Índice del elemento en la lista (determina el delay de la animación) */
  @Input() index: number = 0;

  /** Tipo de animación de entrada: desplazamiento vertical, horizontal o escala */
  @Input() animation: 'fadeUp' | 'fadeLeft' | 'fadeScale' = 'fadeUp';

  /** Delay entre cada elemento consecutivo en milisegundos */
  @Input() staggerDelay: number = STAGGER_DELAY.NORMAL;

  /** Duración total de la animación en milisegundos */
  @Input() duration: number = ANIMATION_DURATION.SLOW;

  /** Indica si la app se ejecuta en un navegador (vs SSR) */
  private isBrowser: boolean;

  /**
   * Constructor del componente.
   * @param el - Referencia al elemento DOM del host
   * @param platformId - Token de plataforma para compatibilidad SSR
   */
  constructor(
    private readonly el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Inicializa la animación al montar el componente.
   * Configura el estado inicial oculto y programa la transición
   * al estado visible en el siguiente frame de renderizado.
   */
  ngOnInit(): void {
    if (!this.isBrowser) return;

    const element = this.el.nativeElement;
    const delay = this.index * this.staggerDelay;

    /** Estado inicial oculto */
    element.style.opacity = '0';
    element.style.transition = `opacity ${this.duration}ms ${ANIMATION_EASING.EASE}, transform ${this.duration}ms ${ANIMATION_EASING.SPRING}`;
    element.style.transitionDelay = `${delay}ms`;

    switch (this.animation) {
      case 'fadeUp':
        element.style.transform = 'translateY(20px)';
        break;
      case 'fadeLeft':
        element.style.transform = 'translateX(-20px)';
        break;
      case 'fadeScale':
        element.style.transform = 'scale(0.9)';
        break;
    }

    /** Activar animación en el siguiente frame para asegurar el repaint */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        element.style.opacity = '1';
        element.style.transform = 'none';
      });
    });
  }
}
// #endregion
