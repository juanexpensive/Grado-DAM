/**
 * @fileoverview Componente raíz de AbastecePro.
 * Inicializa el tema visual del usuario desde localStorage y muestra
 * el router-outlet con un header de logo que se oculta en la pantalla de login.
 */

// #region Imports
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet, RouterLink, NavigationEnd } from '@angular/router';
import { STORAGE_KEYS } from './shared/constants/app.constants';
import { filter, map } from 'rxjs/operators';
// #endregion

// #region Componente

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    @if (showLogo) {
      <header class="app-header">
        <a routerLink="/home" class="app-header__logo-link" aria-label="Ir a inicio">
          <img src="assets/abastecepro-logo-lightmode.png" alt="AbastecePro" class="app-header__logo app-header__logo--light" />
          <img src="assets/abastecepro-logo-darkmode.png" alt="AbastecePro" class="app-header__logo app-header__logo--dark" />
        </a>
      </header>
    }
    <router-outlet />
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
    }

    .app-header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      padding: 12px 16px;
      pointer-events: none;
    }

    .app-header__logo-link {
      display: inline-block;
      pointer-events: all;
      transition: opacity 0.2s ease, transform 0.2s ease;
      border-radius: 8px;

      &:hover {
        opacity: 0.85;
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.97);
      }
    }

    .app-header__logo {
      height: 40px;
      width: auto;
      display: block;
      border-radius: 8px;
    }

    .app-header__logo--dark {
      display: none;
    }

    :host-context([data-theme='dark']) {
      .app-header__logo--light {
        display: none;
      }
      .app-header__logo--dark {
        display: block;
      }
    }
  `,
})
export class App implements OnInit {
  /** Controla la visibilidad del logo (se oculta en la pantalla de login) */
  showLogo = false;

  /**
   * @param platformId Identificador de plataforma para verificar si es navegador
   * @param router Servicio de navegación para escuchar cambios de ruta
   */
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly router: Router,
  ) {}

  /**
   * Inicializa el tema visual y suscribe a los eventos de navegación
   * para mostrar u ocultar el logo según la ruta activa.
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initTheme();
    }

    // Ocultar el logo en la pantalla de login
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(e => !e.urlAfterRedirects.startsWith('/login')),
      )
      .subscribe(visible => (this.showLogo = visible));
  }

  /**
   * Aplica el tema guardado en localStorage al atributo `data-theme` del documento.
   * Si no hay tema guardado, usa 'light' por defecto.
   */
  private initTheme(): void {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }
}
// #endregion
