/**
 * @fileoverview Caso de uso: Crear un nuevo pedido con sus detalles.
 * Primero crea el pedido en estado 'pendiente' y luego
 * genera las líneas de detalle asociadas al pedido creado.
 */

// #region Imports
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Pedido } from '../../entities/pedido.entity';
import { DetallePedido } from '../../entities/detalle-pedido.entity';
import { CrearPedidoDto } from '../../dtos/pedido/crear-pedido.dto';
import { IPedidoRepository } from '../../interfaces/repositories/i-pedido.repository';
import { IDetallePedidoRepository } from '../../interfaces/repositories/i-detalle-pedido.repository';
import { PEDIDO_REPOSITORY_TOKEN, DETALLE_PEDIDO_REPOSITORY_TOKEN } from '../../../di/types/injection.tokens';
// #endregion

// #region Caso de Uso
/**
 * Caso de uso que orquesta la creación de un pedido junto con sus líneas de detalle.
 * Calcula el precio total, crea el pedido y luego genera los detalles en cadena.
 */
@Injectable({ providedIn: 'root' })
export class CrearPedidoUseCase {
  /**
   * @param pedidoRepo Repositorio de pedidos inyectado por token
   * @param detallePedidoRepo Repositorio de detalles de pedido inyectado por token
   */
  constructor(
    @Inject(PEDIDO_REPOSITORY_TOKEN) private readonly pedidoRepo: IPedidoRepository,
    @Inject(DETALLE_PEDIDO_REPOSITORY_TOKEN) private readonly detallePedidoRepo: IDetallePedidoRepository,
  ) {}

  /**
   * Ejecuta la creación completa de un pedido:
   * 1. Calcula el precio total sumando (cantidad × precio unitario) de cada detalle
   * 2. Crea el pedido en el repositorio
   * 3. Genera las líneas de detalle asociadas al pedido recién creado
   * @param dto - DTO con los datos del pedido y sus líneas de detalle
   * @returns Observable con el pedido creado y sus detalles asociados
   */
  execute(dto: CrearPedidoDto): Observable<{ pedido: Pedido; detalles: DetallePedido[] }> {
    // Calcular el precio total sumando (cantidad × precio unitario) de cada detalle
    const precioTotal = dto.detalles.reduce(
      (total, d) => total + d.cantidadProducto * d.precioUnitario,
      0,
    );

    // Construir la entidad del pedido sin ID (lo asigna el repositorio)
    const nuevoPedido: Omit<Pedido, 'id'> = {
      fecha: new Date().toISOString(),
      idUsuario: dto.idUsuario,
      idEmpresaProveedora: dto.idEmpresaProveedora,
      idEmpresaConsumidora: dto.idEmpresaConsumidora,
      precioTotal,
      estado: 'pendiente',
      activo: true,
    };

    // Crear el pedido y, una vez creado, generar los detalles con el ID obtenido
    return this.pedidoRepo.create(nuevoPedido).pipe(
      switchMap((pedidoCreado: Pedido) => {
        const detallesSinId: Omit<DetallePedido, 'id'>[] = dto.detalles.map((d) => ({
          idPedido: pedidoCreado.id,
          idProducto: d.idProducto,
          cantidadProducto: d.cantidadProducto,
          precioUnitario: d.precioUnitario,
        }));

        return this.detallePedidoRepo.createMany(detallesSinId).pipe(
          switchMap((detallesCreados: DetallePedido[]) => {
            return new Observable<{ pedido: Pedido; detalles: DetallePedido[] }>((observer) => {
              observer.next({ pedido: pedidoCreado, detalles: detallesCreados });
              observer.complete();
            });
          }),
        );
      }),
    );
  }
}
// #endregion
