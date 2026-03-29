/**
 * @fileoverview Componente de gestión de usuarios (solo administradores).
 * Lista todos los usuarios con opciones de crear, editar y eliminar.
 * Incluye diálogo de confirmación para eliminación con signals.
 */

// #region Imports
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ListadoUsuariosViewModel } from '../../../../presentation/viewmodels/usuarios/listado-usuarios.viewmodel';
import { SkeletonLoadingComponent } from '../../../../shared/components/loading/skeleton-loading.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { AnimatedListItemComponent } from '../../../../shared/components/animated-list-item/animated-list-item.component';
// #endregion

// #region Componente
@Component({
  selector: 'app-listado-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonLoadingComponent, ErrorMessageComponent,
    AnimatedListItemComponent
  ],
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss'],
})
export class ListadoUsuariosComponent implements OnInit {
  /** Signal con los datos del usuario pendiente de eliminar (null si no hay confirmación activa) */
  usuarioPendienteEliminar = signal<{ id: number; nombre: string } | null>(null);

  /**
   * @param vm ViewModel que gestiona la carga y eliminación de usuarios
   * @param router Servicio de navegación de Angular
   */
  constructor(
    public readonly vm: ListadoUsuariosViewModel,
    private readonly router: Router
  ) {}

  /** Carga la lista de usuarios al inicializar el componente */
  ngOnInit(): void {
    this.vm.cargarUsuarios();
  }

  /** Navega a la pantalla de creación de nuevo usuario */
  crearUsuario(): void {
    this.router.navigate(['/usuarios/crear']);
  }

  /**
   * Navega a la pantalla de edición del usuario indicado.
   * @param id Identificador del usuario a editar
   */
  editarUsuario(id: number): void {
    this.router.navigate(['/usuarios/editar', id]);
  }

  /**
   * Abre el diálogo de confirmación de eliminación.
   * @param id Identificador del usuario a eliminar
   * @param nombre Nombre del usuario (mostrado en el mensaje de confirmación)
   */
  eliminarUsuario(id: number, nombre: string): void {
    this.usuarioPendienteEliminar.set({ id, nombre });
  }

  /** Confirma la eliminación del usuario pendiente y cierra el diálogo */
  confirmarEliminacion(): void {
    const usuario = this.usuarioPendienteEliminar();
    if (usuario) {
      this.vm.eliminarUsuario(usuario.id);
      this.usuarioPendienteEliminar.set(null);
    }
  }

  /** Descarta la eliminación pendiente y cierra el diálogo de confirmación */
  descartarEliminacion(): void {
    this.usuarioPendienteEliminar.set(null);
  }

  /**
   * Obtiene las iniciales del nombre del usuario (máximo 2 caracteres).
   * @param nombre Nombre completo del usuario
   * @returns Iniciales en mayúsculas (ej. "JD" para "Juan Díaz")
   */
  getIniciales(nombre: string): string {
    return nombre
      .split(' ')
      .map(p => p[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  /** Navega de vuelta al menú principal */
  volver(): void {
    this.router.navigate(['/home']);
  }
}
// #endregion
