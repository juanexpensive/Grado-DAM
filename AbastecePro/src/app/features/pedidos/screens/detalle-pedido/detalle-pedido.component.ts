/**
 * @fileoverview Componente de detalle de un pedido.
 * Muestra la información completa del pedido con sus líneas de detalle,
 * permite avanzar o cancelar el estado del pedido mediante un diálogo
 * de confirmación basado en signals, y descargar la factura en PDF.
 */

// #region Imports
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DetallePedidoViewmodel } from '../../../../presentation/viewmodels/pedidos/detalle-pedido.viewmodel';
import { SkeletonLoadingComponent } from '../../../../shared/components/loading/skeleton-loading.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { AnimatedListItemComponent } from '../../../../shared/components/animated-list-item/animated-list-item.component';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
import { FacturaPdfService } from '../../../../shared/services/factura-pdf.service';
import { EstadoPedido } from '../../../../domain/entities/pedido.entity';
import { HistorialPedidosViewModel } from '../../../../presentation/viewmodels/pedidos/historial-pedidos.viewmodel';
// #endregion

// #region Constantes
/** Mapa de transiciones de estado válidas: define el siguiente estado para cada estado actual */
const TRANSICIONES_ESTADO: Record<string, EstadoPedido> = {
  pendiente: 'enviado',
  enviado: 'entregado',
};

/** Etiquetas descriptivas para los botones de avanzar estado */
const ETIQUETAS_AVANCE: Record<string, string> = {
  pendiente: '📦 Marcar como enviado',
  enviado: '✅ Marcar como entregado',
};
// #endregion

// #region Componente
@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonLoadingComponent, ErrorMessageComponent,
    AnimatedListItemComponent, CurrencyFormatPipe
  ],
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss'],
})
export class DetallePedidoComponent implements OnInit {
  /** Signal que controla la visibilidad del diálogo de confirmación */
  mostrarConfirmacion = signal(false);
  /** Signal con el tipo de acción pendiente de confirmar: 'avanzar' o 'cancelar' */
  accionPendiente = signal<'avanzar' | 'cancelar' | null>(null);
  /** Signal con el mensaje a mostrar en el diálogo de confirmación */
  mensajeConfirmacion = signal('');
  /** Signal con la etiqueta del botón de confirmación */
  etiquetaConfirmar = signal('');

  /**
   * @param vm ViewModel que gestiona la carga del pedido y actualización de estado
   * @param route Ruta activa para obtener el parámetro `:id`
   * @param router Servicio de navegación de Angular
   * @param facturaPdfService Servicio para generar la factura PDF del pedido
   * @param historialVm ViewModel del historial para refrescar la lista tras cambios de estado
   */
  constructor(
    public readonly vm: DetallePedidoViewmodel,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly facturaPdfService: FacturaPdfService,
    private readonly historialVm: HistorialPedidosViewModel
  ) {}

  /** Extrae el ID de la URL y solicita al ViewModel que cargue el detalle del pedido */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.vm.cargarDetalle(id);
    }
  }

  /**
   * Devuelve la clase CSS correspondiente al estado del pedido.
   * @param estado Estado actual del pedido
   * @returns Clase CSS con formato `estado--{estado}`
   */
  getEstadoClass(estado: string): string {
    return `estado--${estado}`;
  }

  /**
   * Comprueba si el pedido actual puede avanzar al siguiente estado.
   * Solo los estados 'pendiente' y 'enviado' tienen transición definida.
   * @returns `true` si existe una transición válida desde el estado actual
   */
  puedeAvanzar(): boolean {
    const estado = this.vm.pedido()?.estado;
    return !!estado && estado in TRANSICIONES_ESTADO;
  }

  /**
   * Comprueba si el pedido actual puede ser cancelado.
   * No se puede cancelar un pedido ya cancelado o entregado.
   * @returns `true` si el pedido puede cancelarse
   */
  puedeCancelar(): boolean {
    const estado = this.vm.pedido()?.estado;
    return !!estado && estado !== 'cancelado' && estado !== 'entregado';
  }

  /**
   * Obtiene la etiqueta descriptiva del botón de avance de estado.
   * @returns Texto del botón (ej. '📦 Marcar como enviado') o vacío si no aplica
   */
  getEtiquetaAvance(): string {
    const estado = this.vm.pedido()?.estado ?? '';
    return ETIQUETAS_AVANCE[estado] ?? '';
  }

  /** Abre el diálogo de confirmación para avanzar al siguiente estado del pedido */
  avanzarEstado(): void {
    const estado = this.vm.pedido()?.estado;
    if (estado && estado in TRANSICIONES_ESTADO) {
      const siguiente = TRANSICIONES_ESTADO[estado];
      const etiqueta = ETIQUETAS_AVANCE[estado] ?? '';
      this.mensajeConfirmacion.set(`¿Deseas ${etiqueta.replace(/^[^\s]+\s/, '').toLowerCase()}?`);
      this.etiquetaConfirmar.set(etiqueta);
      this.accionPendiente.set('avanzar');
      this.mostrarConfirmacion.set(true);
    }
  }

  /** Abre el diálogo de confirmación para cancelar el pedido */
  cancelarPedido(): void {
    this.mensajeConfirmacion.set('¿Estás seguro de que deseas cancelar este pedido?');
    this.etiquetaConfirmar.set('Sí, cancelar pedido');
    this.accionPendiente.set('cancelar');
    this.mostrarConfirmacion.set(true);
  }

  /**
   * Ejecuta la acción previamente confirmada por el usuario.
   * Avanza al siguiente estado o cancela el pedido según la acción pendiente.
   * Refresca el historial de pedidos tras la actualización exitosa.
   */
  ejecutarAccion(): void {
    const accion = this.accionPendiente();
    this.mostrarConfirmacion.set(false);
    this.accionPendiente.set(null);

    if (accion === 'avanzar') {
      const estado = this.vm.pedido()?.estado;
      if (estado && estado in TRANSICIONES_ESTADO) {
        this.vm.actualizarEstado(TRANSICIONES_ESTADO[estado], () => {
          this.historialVm.cargarPedidos(true);
        });
      }
    } else if (accion === 'cancelar') {
      this.vm.actualizarEstado('cancelado', () => {
        this.historialVm.cargarPedidos(true);
      });
    }
  }

  /** Descarta la confirmación pendiente y cierra el diálogo */
  descartarConfirmacion(): void {
    this.mostrarConfirmacion.set(false);
    this.accionPendiente.set(null);
  }

  /** Genera y descarga la factura del pedido actual en formato PDF */
  descargarFactura(): void {
    const pedido = this.vm.pedido();
    if (pedido) {
      this.facturaPdfService.generarFactura(pedido);
    }
  }

  /** Navega de vuelta al historial de pedidos */
  volver(): void {
    this.router.navigate(['/pedidos']);
  }
}
// #endregion
