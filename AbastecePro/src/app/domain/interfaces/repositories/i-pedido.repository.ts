/**
 * @fileoverview Interfaz del repositorio de Pedidos.
 * Define operaciones CRUD y consultas sobre pedidos del sistema.
 */

// #region Imports
import { Observable } from 'rxjs';
import { Pedido, EstadoPedido } from '../../entities/pedido.entity';
// #endregion

// #region Interfaz
/**
 * Contrato del repositorio de pedidos.
 * Define las operaciones CRUD y consultas específicas
 * como filtrado por usuario y actualización de estado.
 */
export interface IPedidoRepository {
  /** Obtiene todos los pedidos */
  getAll(): Observable<Pedido[]>;

  /** Obtiene pedidos filtrados por ID de usuario */
  getByUsuarioId(idUsuario: number): Observable<Pedido[]>;

  /** Obtiene un pedido por su ID */
  getById(id: number): Observable<Pedido>;

  /** Crea un nuevo pedido */
  create(pedido: Omit<Pedido, 'id'>): Observable<Pedido>;

  /** Actualiza el estado de un pedido */
  actualizarEstado(id: number, estado: EstadoPedido): Observable<Pedido>;

  /** Elimina un pedido por su ID */
  delete(id: number): Observable<boolean>;
}
// #endregion
