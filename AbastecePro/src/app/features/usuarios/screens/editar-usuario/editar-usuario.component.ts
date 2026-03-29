/**
 * @fileoverview Componente de la pantalla de edición de usuario.
 * Carga los datos existentes del usuario y permite modificarlos.
 * Delega la lógica de carga y guardado al {@link EditarUsuarioViewModel}.
 */

// #region Imports
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarUsuarioViewModel } from '../../../../presentation/viewmodels/usuarios/editar-usuario.viewmodel';
import { SkeletonLoadingComponent } from '../../../../shared/components/loading/skeleton-loading.component';
import { PhoneInputComponent } from '../../../../shared/components/phone-input/phone-input.component';
// #endregion

// #region Componente
@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, SkeletonLoadingComponent, PhoneInputComponent],
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {
  /**
   * @param vm ViewModel que gestiona el formulario de edición del usuario
   * @param route Ruta activa para obtener el parámetro `:id`
   * @param router Servicio de navegación de Angular
   */
  constructor(
    public readonly vm: EditarUsuarioViewModel,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  /** Extrae el ID de la URL y solicita al ViewModel que cargue los datos del usuario */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.vm.cargarUsuario(id);
    }
  }

  /** Envía los cambios realizados al ViewModel para persistirlos */
  onSubmit(): void {
    this.vm.guardar();
  }

  /** Cancela la edición y navega de vuelta al listado de usuarios */
  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }
}
// #endregion
