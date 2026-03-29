/**
 * @fileoverview Constantes de animación.
 * Centraliza todas las duraciones, curvas de aceleración y distancias
 * de las animaciones para que sean fácilmente modificables desde un solo lugar.
 */

// #region Duraciones
/** Duraciones de las animaciones en milisegundos */
export const ANIMATION_DURATION = {
  /** Animación muy rápida (tooltips, micro-interacciones) */
  FAST: 100,
  /** Animación normal (transiciones de estado) */
  NORMAL: 180,
  /** Animación lenta (entradas de elementos) */
  SLOW: 280,
  /** Animación muy lenta (transiciones de página) */
  VERY_SLOW: 400,
  /** Duración del efecto shimmer del skeleton loading */
  SKELETON_SHIMMER: 1200,
} as const;
// #endregion

// #region Stagger Delays
/** Delay entre elementos en listas (efecto escalonado) en milisegundos */
export const STAGGER_DELAY = {
  /** Delay rápido entre elementos */
  FAST: 25,
  /** Delay normal entre elementos */
  NORMAL: 40,
  /** Delay lento entre elementos */
  SLOW: 70,
} as const;
// #endregion

// #region Curvas de Aceleración
/** Curvas de aceleración (easing) definidas como curvas de Bézier */
export const ANIMATION_EASING = {
  /** Ease estándar (Material Design) */
  EASE: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Ease in: aceleración al inicio */
  EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
  /** Ease out: deceleración al final */
  EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
  /** Ease in-out: suave en ambos extremos */
  EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Spring: efecto de rebote elástico */
  SPRING: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;
// #endregion

// #region Distancias de Desplazamiento
/** Distancias de desplazamiento para las animaciones de entrada */
export const ANIMATION_OFFSET = {
  /** Desplazamiento pequeño */
  SMALL: '10px',
  /** Desplazamiento medio */
  MEDIUM: '20px',
  /** Desplazamiento grande */
  LARGE: '30px',
} as const;
// #endregion
