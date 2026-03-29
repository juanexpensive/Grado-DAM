/**
 * @fileoverview Componente de la pantalla del carrito de compras.
 * Permite revisar los productos seleccionados, modificar cantidades,
 * confirmar el pedido (creando pedido + detalles) y actualizar el stock.
 */

// #region Imports
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoViewmodel } from '../../../../presentation/viewmodels/productos/carrito.viewmodel';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
import { AnimatedListItemComponent } from '../../../../shared/components/animated-list-item/animated-list-item.component';
import { AuthService } from '../../../../core/services/auth.service';
import { IPedidoRepository } from '../../../../domain/interfaces/repositories/i-pedido.repository';
import { IDetallePedidoRepository } from '../../../../domain/interfaces/repositories/i-detalle-pedido.repository';
import { IProductoRepository } from '../../../../domain/interfaces/repositories/i-producto.repository';
import { PEDIDO_REPOSITORY_TOKEN, DETALLE_PEDIDO_REPOSITORY_TOKEN, PRODUCTO_REPOSITORY_TOKEN } from '../../../../di/types/injection.tokens';
import { switchMap, catchError, finalize } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
// #endregion

// #region Componente
@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe, AnimatedListItemComponent],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent {
  /** Indica si el pedido fue confirmado exitosamente */
  pedidoConfirmado = false;
  /** Indica si hay una operación de confirmación en curso */
  procesando = false;

  /**
   * @param carrito ViewModel del carrito de compras con items y totales
   * @param router Servicio de navegación de Angular
   * @param authService Servicio de autenticación para obtener el usuario actual
   * @param pedidoRepo Repositorio de pedidos para crear el pedido
   * @param detalleRepo Repositorio de detalles para crear las líneas del pedido
   * @param productoRepo Repositorio de productos para actualizar el stock
   */
  constructor(
    public readonly carrito: CarritoViewmodel,
    private readonly router: Router,
    private readonly authService: AuthService,
    @Inject(PEDIDO_REPOSITORY_TOKEN) private readonly pedidoRepo: IPedidoRepository,
    @Inject(DETALLE_PEDIDO_REPOSITORY_TOKEN) private readonly detalleRepo: IDetallePedidoRepository,
    @Inject(PRODUCTO_REPOSITORY_TOKEN) private readonly productoRepo: IProductoRepository,
  ) {}

  /**
   * Incrementa en 1 la cantidad de un producto en el carrito.
   * @param idProducto Identificador del producto
   * @param cantidadActual Cantidad actual del producto
   */
  incrementar(idProducto: number, cantidadActual: number): void {
    this.carrito.actualizarCantidad(idProducto, cantidadActual + 1);
  }

  /**
   * Decrementa en 1 la cantidad de un producto en el carrito.
   * @param idProducto Identificador del producto
   * @param cantidadActual Cantidad actual del producto
   */
  decrementar(idProducto: number, cantidadActual: number): void {
    this.carrito.actualizarCantidad(idProducto, cantidadActual - 1);
  }

  /**
   * Elimina un producto del carrito.
   * @param idProducto Identificador del producto a eliminar
   */
  eliminar(idProducto: number): void {
    this.carrito.eliminarProducto(idProducto);
  }

  /**
   * Confirma el pedido ejecutando el flujo crítico:
   * 1. Crea el pedido en la API
   * 2. Crea las líneas de detalle asociadas al pedido creado
   * 3. Vacía el carrito y actualiza el stock (mejor esfuerzo)
   * 4. Navega al historial de pedidos
   */
  confirmarPedido(): void {
    const user = this.authService.getCurrentUser();
    if (!user || this.carrito.items().length === 0) return;

    this.procesando = true;

    // Usar fecha local en formato ISO para evitar desfase de zona horaria
    const now = new Date();
    const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();

    const idProveedor = this.carrito.items()[0]?.idEmpresaProveedora ?? 1;

    const pedidoData = {
      fecha: localIso,
      idUsuario: user.id,
      idEmpresaProveedora: idProveedor,
      idEmpresaConsumidora: user.idEmpresa ?? 1,
      precioTotal: this.carrito.precioTotal(),
      estado: 'pendiente' as const,
      activo: true,
    };

    const itemsDelCarrito = this.carrito.items();

    // Flujo crítico: crear pedido → crear detalles del pedido
    this.pedidoRepo.create(pedidoData).pipe(
      switchMap(pedido =>
        this.detalleRepo.createMany(
          itemsDelCarrito.map(item => ({
            idPedido: pedido.id,
            idProducto: item.idProducto,
            cantidadProducto: item.cantidad,
            precioUnitario: item.precioUnitario,
          }))
        )
      ),
      finalize(() => { this.procesando = false; }),
    ).subscribe({
      next: () => {
        this.carrito.vaciarCarrito();
        this.actualizarStock(itemsDelCarrito);
        setTimeout(() => this.router.navigate(['/pedidos'], { state: { freshLoad: true } }), 0);
      },
      error: () => { /* procesando ya reseteado por finalize */ },
    });
  }

  /**
   * Descuenta el stock de cada producto pedido en la API (mejor esfuerzo).
   * No bloquea la confirmación del pedido; los errores se ignoran silenciosamente.
   * @param items Lista de productos con sus cantidades pedidas
   */
  private actualizarStock(items: { idProducto: number; cantidad: number }[]): void {
    this.productoRepo.getAll().pipe(
      switchMap(productos =>
        forkJoin(
          items.map(item => {
            const producto = productos.find(p => p.id === item.idProducto);
            if (!producto) return of(null);
            return this.productoRepo.update({
              ...producto,
              stock: Math.max(0, producto.stock - item.cantidad),
            }).pipe(catchError(() => of(null)));
          })
        )
      ),
      catchError(() => of(null)),
    ).subscribe();
  }

  /** Navega al catálogo de productos para seguir comprando */
  seguirComprando(): void {
    this.router.navigate(['/compras']);
  }

  /** Navega al historial de pedidos */
  verPedidos(): void {
    this.router.navigate(['/pedidos']);
  }

  /** Navega de vuelta al catálogo de productos */
  volver(): void {
    this.router.navigate(['/compras']);
  }
}
// #endregion
