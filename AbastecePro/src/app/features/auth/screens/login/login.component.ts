/**
 * @fileoverview Componente de la pantalla de Login.
 * Permite a los usuarios iniciar sesión en el ERP mediante email y contraseña.
 * Delega la autenticación al {@link LoginViewModel}.
 */

// #region Imports
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginViewModel } from '../../../../presentation/viewmodels/auth/login.viewmodel';
// #endregion

// #region Componente
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /** @param vm ViewModel que gestiona el estado del formulario de login y la autenticación */
  constructor(public readonly vm: LoginViewModel) {}

  /** Reinicia el formulario de login al inicializar el componente */
  ngOnInit(): void {
    this.vm.reset();
  }

  /** Envía las credenciales al ViewModel para iniciar sesión */
  onSubmit(): void {
    this.vm.login();
  }
}
// #endregion
