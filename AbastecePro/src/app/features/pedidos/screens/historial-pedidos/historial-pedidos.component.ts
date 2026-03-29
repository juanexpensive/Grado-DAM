/**
 * @fileoverview Componente del historial de pedidos.
 * Muestra todos los pedidos realizados con opción de filtrar solo los propios.
 * Incluye indicadores visuales de estado mediante clases CSS y emojis.
 */

// #region Imports
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HistorialPedidosViewModel } from '../../../../presentation/viewmodels/pedidos/historial-pedidos.viewmodel';
import { SkeletonLoadingComponent } from '../../../../shared/components/loading/skeleton-loading.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { AnimatedListItemComponent } from '../../../../shared/components/animated-list-item/animated-list-item.component';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
// #endregion

// #region Componente
@Component({
  selector: 'app-historial-pedidos',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    SkeletonLoadingComponent, ErrorMessageComponent,
    AnimatedListItemComponent, CurrencyFormatPipe
  ],
  templateUrl: './historial-pedidos.component.html',
  styleUrls: ['./historial-pedidos.component.scss'],
})
export class HistorialPedidosComponent implements OnInit {
  /**
   * @param vm ViewModel que gestiona la carga, filtrado y estado de los pedidos
   * @param router Servicio de navegación de Angular
   */
  constructor(
    public readonly vm: HistorialPedidosViewModel,
    private readonly router: Router
  ) {}

  /**
   * Carga los pedidos al inicializar. Si la navegación incluye el estado
   * `freshLoad`, fuerza la recarga desde la API en lugar de usar caché.
   */
  ngOnInit(): void {
    const freshLoad =
      this.router.getCurrentNavigation()?.extras?.state?.['freshLoad'] === true
      || history.state?.freshLoad === true;
    this.vm.cargarPedidos(freshLoad);
  }

  /**
   * Navega a la pantalla de detalle del pedido seleccionado.
   * @param idPedido Identificador del pedido
   */
  verDetalle(idPedido: number): void {
    this.router.navigate(['/pedidos', idPedido]);
  }

  /** Navega de vuelta al menú principal */
  volver(): void {
    this.router.navigate(['/home']);
  }

  /**
   * Devuelve la clase CSS correspondiente al estado del pedido.
   * @param estado Estado actual del pedido (pendiente, enviado, entregado, cancelado)
   * @returns Clase CSS para aplicar el estilo visual del estado
   */
  getEstadoClass(estado: string): string {
    const clases: Record<string, string> = {
      pendiente: 'estado--pendiente',
      enviado: 'estado--enviado',
      entregado: 'estado--entregado',
      cancelado: 'estado--cancelado',
    };
    return clases[estado] ?? '';
  }

  /**
   * Devuelve el emoji representativo del estado del pedido.
   * @param estado Estado actual del pedido
   * @returns Emoji correspondiente al estado (⏳, 📦, ✅, ❌)
   */
  getEstadoEmoji(estado: string): string {
    const emojis: Record<string, string> = {
      pendiente: '⏳',
      enviado: '📦',
      entregado: '✅',
      cancelado: '❌',
    };
    return emojis[estado] ?? '📋';
  }
}
// #endregion
