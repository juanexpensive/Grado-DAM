/**
 * @fileoverview Componente de la pantalla de configuración.
 * Permite cambiar tema visual, fondo de pantalla, ver perfil del usuario y cerrar sesión.
 * Delega toda la lógica de negocio al {@link ConfiguracionViewModel}.
 */

// #region Imports
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfiguracionViewModel } from '../../../../presentation/viewmodels/ajustes/configuracion.viewmodel';
// #endregion

// #region Componente
@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent implements OnInit {
  /** Versión visible de la aplicación mostrada en la pantalla de ajustes */
  readonly appVersion = '2.1.0';

  /**
   * @param vm ViewModel que gestiona el estado de configuración (tema, fondo, sesión)
   * @param router Servicio de navegación de Angular
   */
  constructor(
    public readonly vm: ConfiguracionViewModel,
    private readonly router: Router
  ) {}

  /** Hook de inicialización. Las configuraciones se cargan en el constructor del ViewModel. */
  ngOnInit(): void {
    // Las configuraciones se cargan en el constructor del ViewModel
  }

  /** Navega de vuelta al menú principal */
  volver(): void {
    this.router.navigate(['/home']);
  }
}
// #endregion
