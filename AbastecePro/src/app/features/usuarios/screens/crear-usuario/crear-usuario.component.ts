/**
 * @fileoverview Componente de la pantalla de creación de usuario.
 * Presenta un formulario con validación basada en signals para registrar nuevos usuarios.
 * Delega la lógica de creación al {@link CrearUsuarioViewModel}.
 */

// #region Imports
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CrearUsuarioViewModel } from '../../../../presentation/viewmodels/usuarios/crear-usuario.viewmodel';
import { PhoneInputComponent } from '../../../../shared/components/phone-input/phone-input.component';
// #endregion

// #region Componente
@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, PhoneInputComponent],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss'],
})
export class CrearUsuarioComponent {
  /**
   * @param vm ViewModel que gestiona el formulario de creación y la validación
   * @param router Servicio de navegación de Angular
   */
  constructor(
    public readonly vm: CrearUsuarioViewModel,
    private readonly router: Router
  ) {}

  /** Envía el formulario de creación al ViewModel para registrar el nuevo usuario */
  onSubmit(): void {
    this.vm.crear();
  }

  /** Cancela la creación y navega de vuelta al listado de usuarios */
  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }
}
// #endregion
