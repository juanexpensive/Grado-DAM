/**
 * ViewModel para el detalle de un pedido.
 *
 * Gestiona la carga completa de un pedido individual con todos sus datos:
 * información del pedido, líneas de detalle con productos y datos del usuario.
 * También permite actualizar el estado del pedido (pendiente, enviado, entregado, cancelado).
 * Muestra pedidos incluso si el usuario asociado ha sido eliminado (activo = false).
 */

// #region Imports
import { Injectable, Inject, signal } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { IPedidoRepository } from '../../../domain/interfaces/repositories/i-pedido.repository';
import { IDetallePedidoRepository } from '../../../domain/interfaces/repositories/i-detalle-pedido.repository';
import { IProductoRepository } from '../../../domain/interfaces/repositories/i-producto.repository';
import { IUsuarioRepository } from '../../../domain/interfaces/repositories/i-usuario.repository';
import { PEDIDO_REPOSITORY_TOKEN, DETALLE_PEDIDO_REPOSITORY_TOKEN, PRODUCTO_REPOSITORY_TOKEN, USUARIO_REPOSITORY_TOKEN } from '../../../di/types/injection.tokens';
import { PedidoDetalleDto } from '../../../domain/dtos/pedido/pedido-detalle.dto';
import { EstadoPedido } from '../../../domain/entities/pedido.entity';
// #endregion

@Injectable({ providedIn: 'root' })
export class DetallePedidoViewmodel {

  // #region Señales de estado
  /** Indica si se está cargando la información del pedido */
  isLoading = signal(false);

  /** Mensaje de error en caso de fallo al cargar o actualizar el pedido */
  errorMessage = signal<string | null>(null);

  /** Datos completos del pedido con sus detalles, mapeado al DTO de detalle */
  pedido = signal<PedidoDetalleDto | null>(null);

  /** Indica si se está procesando una actualización de estado del pedido */
  actualizandoEstado = signal(false);
  // #endregion

  // #region Constructor
  /**
   * Inyecta los repositorios necesarios para cargar toda la información del pedido.
   *
   * @param pedidoRepo - Repositorio de pedidos para obtener el pedido principal.
   * @param detalleRepo - Repositorio de detalles para las líneas del pedido.
   * @param productoRepo - Repositorio de productos para resolver nombres de productos.
   * @param usuarioRepo - Repositorio de usuarios para resolver el nombre del solicitante.
   *                       Incluye usuarios inactivos (eliminados) para mantener trazabilidad.
   */
  constructor(
    @Inject(PEDIDO_REPOSITORY_TOKEN) private readonly pedidoRepo: IPedidoRepository,
    @Inject(DETALLE_PEDIDO_REPOSITORY_TOKEN) private readonly detalleRepo: IDetallePedidoRepository,
    @Inject(PRODUCTO_REPOSITORY_TOKEN) private readonly productoRepo: IProductoRepository,
    @Inject(USUARIO_REPOSITORY_TOKEN) private readonly usuarioRepo: IUsuarioRepository,
  ) {}
  // #endregion

  // #region Métodos públicos
  /**
   * Carga toda la información de un pedido específico.
   *
   * Realiza peticiones en paralelo (forkJoin) para obtener:
   * - El pedido principal por su ID.
   * - Las líneas de detalle del pedido.
   * - Todos los productos (para resolver nombres).
   * - Todos los usuarios (incluidos los inactivos, para mostrar quién realizó el pedido).
   *
   * Los datos se combinan y transforman en un PedidoDetalleDto con toda la información
   * necesaria para la vista de detalle.
   *
   * @param idPedido - ID del pedido a cargar.
   */
  cargarDetalle(idPedido: number): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    forkJoin({
      pedido: this.pedidoRepo.getById(idPedido),
      detalles: this.detalleRepo.getByPedidoId(idPedido),
      productos: this.productoRepo.getAll(),
      usuarios: this.usuarioRepo.getAll(),
    })
    .pipe(finalize(() => this.isLoading.set(false)))
    .subscribe({
      next: ({ pedido, detalles, productos, usuarios }) => {
        // Busca el usuario que realizó el pedido (puede ser inactivo/eliminado)
        const usuario = usuarios.find(u => u.id === pedido.idUsuario);

        this.pedido.set({
          id: pedido.id,
          fecha: pedido.fecha,
          // Si el usuario existe muestra su nombre completo, si no muestra un identificador genérico
          usuarioNombre: usuario ? `${usuario.nombre} ${usuario.apellidos}` : `Usuario #${pedido.idUsuario}`,
          empresaProveedoraNombre: '',
          direccionCompleta: '',
          precioTotal: pedido.precioTotal,
          estado: pedido.estado,
          // Mapea cada línea de detalle resolviendo el nombre del producto
          detalles: detalles.map(d => {
            const producto = productos.find(p => p.id === d.idProducto);
            return {
              idProducto: d.idProducto,
              productoNombre: producto?.nombre ?? `Producto #${d.idProducto}`,
              cantidadProducto: d.cantidadProducto,
              precioUnitario: d.precioUnitario,
              subtotal: d.cantidadProducto * d.precioUnitario,
            };
          }),
        });
      },
      error: (err) => this.errorMessage.set(err.message || 'Error al cargar detalle.'),
    });
  }

  /**
   * Actualiza el estado de un pedido (pendiente, enviado, entregado, cancelado).
   *
   * Envía la actualización al backend a través del repositorio.
   * En caso de éxito, actualiza el estado local del pedido y ejecuta el callback opcional.
   *
   * @param nuevoEstado - Nuevo estado a asignar al pedido.
   * @param onSuccess - Función callback opcional que se ejecuta tras la actualización exitosa.
   */
  actualizarEstado(nuevoEstado: EstadoPedido, onSuccess?: () => void): void {
    const pedidoActual = this.pedido();
    if (!pedidoActual) return;

    this.actualizandoEstado.set(true);
    this.pedidoRepo.actualizarEstado(pedidoActual.id, nuevoEstado)
      .pipe(finalize(() => this.actualizandoEstado.set(false)))
      .subscribe({
        next: () => {
          // Actualiza el estado localmente sin necesidad de recargar todo el pedido
          this.pedido.set({ ...pedidoActual, estado: nuevoEstado });
          onSuccess?.();
        },
        error: (err) => this.errorMessage.set(err.message || 'Error al actualizar el estado.'),
      });
  }
  // #endregion
}
