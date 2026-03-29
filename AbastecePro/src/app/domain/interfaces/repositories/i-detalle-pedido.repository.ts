/**
 * @fileoverview Interfaz del repositorio de Detalles de Pedido.
 * Define el contrato CRUD para las líneas de detalle de los pedidos.
 */

// #region Imports
import { Observable } from 'rxjs';
import { DetallePedido } from '../../entities/detalle-pedido.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del repositorio de detalles de pedido.
 * Define las operaciones CRUD disponibles sobre líneas de pedido,
 * incluyendo creación masiva (createMany).
 */
export interface IDetallePedidoRepository {
  /** Obtiene todos los detalles */
  getAll(): Observable<DetallePedido[]>;

  /** Obtiene un detalle por su ID */
  getById(id: number): Observable<DetallePedido>;

  /** Obtiene todos los detalles de un pedido por su ID */
  getByPedidoId(idPedido: number): Observable<DetallePedido[]>;

  /** Crea un detalle de pedido */
  create(detalle: Omit<DetallePedido, 'id'>): Observable<DetallePedido>;

  /** Crea múltiples detalles de pedido en lote */
  createMany(detalles: Omit<DetallePedido, 'id'>[]): Observable<DetallePedido[]>;

  /** Actualiza un detalle de pedido */
  update(detalle: DetallePedido): Observable<DetallePedido>;

  /** Elimina un detalle de pedido por su ID */
  delete(id: number): Observable<boolean>;
}
// #endregion
