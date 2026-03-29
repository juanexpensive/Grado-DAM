/**
 * @fileoverview Directiva Fade-In con IntersectionObserver.
 * Aplica una animación de fade-in cuando el elemento entra en el viewport,
 * con soporte para diferentes direcciones y delays personalizables.
 */

// #region Imports
import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ANIMATION_DURATION, ANIMATION_EASING } from '../constants/animation.constants';
// #endregion

// #region Directiva
@Directive({
  selector: '[appFadeIn]',
  standalone: true,
})
export class FadeInDirective implements OnInit, OnDestroy {
  /** Duración de la animación en milisegundos */
  @Input() fadeInDuration: number = ANIMATION_DURATION.SLOW;

  /** Delay antes de iniciar la animación en milisegundos */
  @Input() fadeInDelay: number = 0;

  /** Dirección de la animación de entrada */
  @Input() fadeInDirection: 'up' | 'left' | 'right' | 'scale' = 'up';

  /** Instancia del IntersectionObserver para detectar visibilidad */
  private observer: IntersectionObserver | null = null;
  /** Indica si la app se ejecuta en un navegador */
  private isBrowser: boolean;

  /**
   * Constructor de la directiva.
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
   * Inicializa el observer y configura el estado oculto inicial.
   * Cuando el elemento entra en el viewport (10% visible),
   * se activa la transición a su estado visible.
   */
  ngOnInit(): void {
    if (!this.isBrowser) return;

    const element = this.el.nativeElement;

    /** Estado inicial: oculto y desplazado según la dirección */
    element.style.opacity = '0';
    element.style.transition = `opacity ${this.fadeInDuration}ms ${ANIMATION_EASING.EASE}, transform ${this.fadeInDuration}ms ${ANIMATION_EASING.EASE}`;
    element.style.transitionDelay = `${this.fadeInDelay}ms`;

    switch (this.fadeInDirection) {
      case 'up':
        element.style.transform = 'translateY(20px)';
        break;
      case 'left':
        element.style.transform = 'translateX(-20px)';
        break;
      case 'right':
        element.style.transform = 'translateX(20px)';
        break;
      case 'scale':
        element.style.transform = 'scale(0.95)';
        break;
    }

    /** Crea el observer para detectar cuando el elemento es visible */
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) translateX(0) scale(1)';
            this.observer?.unobserve(element);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.observer.observe(element);
  }

  /** Desconecta el observer al destruir la directiva para evitar memory leaks */
  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
// #endregion
