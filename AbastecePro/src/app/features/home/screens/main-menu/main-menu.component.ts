/**
 * @fileoverview Componente del menú principal.
 * Muestra los módulos disponibles como tarjetas tipo apps.
 * Carga el fondo de pantalla seleccionado por el usuario desde localStorage.
 */

// #region Imports
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MainMenuViewModel } from '../../../../presentation/viewmodels/home/main-menu.viewmodel';
import { AnimatedListItemComponent } from '../../../../shared/components/animated-list-item/animated-list-item.component';
import { STORAGE_KEYS, WALLPAPERS } from '../../../../shared/constants/app.constants';
// #endregion

// #region Componente
@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [CommonModule, AnimatedListItemComponent],
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  /** URL o gradiente CSS del fondo de pantalla actual */
  backgroundUrl: string = '';

  /**
   * @param vm ViewModel que gestiona los módulos visibles según el rol del usuario
   * @param router Servicio de navegación de Angular
   * @param platformId Identificador de plataforma para verificar si es navegador
   */
  constructor(
    public readonly vm: MainMenuViewModel,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  /** Carga el fondo de pantalla al inicializar el componente */
  ngOnInit(): void {
    this.loadBackground();
  }

  /**
   * Lee el fondo de pantalla seleccionado de localStorage y aplica su gradiente.
   * Solo se ejecuta en entorno de navegador (no SSR).
   */
  private loadBackground(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const fondoId = parseInt(localStorage.getItem(STORAGE_KEYS.WALLPAPER) || '1', 10);
    const fondo = WALLPAPERS.find(w => w.id === fondoId);
    this.backgroundUrl = fondo ? fondo.gradiente : '';
  }

  /**
   * Navega al módulo seleccionado con estado freshLoad.
   * @param ruta Ruta del módulo destino (ej. '/compras')
   */
  navigateTo(ruta: string): void {
    this.router.navigate([ruta], { state: { freshLoad: true } });
  }
}
// #endregion
