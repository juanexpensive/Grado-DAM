/**
 * ViewModel para el historial de pedidos.
 *
 * Gestiona la carga, filtrado y ordenación de los pedidos del sistema.
 * Permite ver todos los pedidos (admin) o solo los del usuario autenticado.
 * Los pedidos se muestran ordenados de más reciente a más antiguo.
 * Se muestran también los pedidos de usuarios eliminados (activo = false).
 */

// #region Imports
import { Injectable, Inject, signal, computed } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { Pedido } from '../../../domain/entities/pedido.entity';
import { IPedidoRepository } from '../../../domain/interfaces/repositories/i-pedido.repository';
import { PEDIDO_REPOSITORY_TOKEN } from '../../../di/types/injection.tokens';
import { AuthService } from '../../../core/services/auth.service';
import { PedidoViewModel } from '../../models/pedido-view.model';
import { ESTADOS_PEDIDO } from '../../../shared/constants/app.constants';
// #endregion

@Injectable({ providedIn: 'root' })
export class HistorialPedidosViewModel {

  // #region Señales de estado
  /** Indica si se están cargando los pedidos desde la API */
  isLoading = signal(false);

  /** Mensaje de error en caso de fallo al cargar los pedidos */
  errorMessage = signal<string | null>(null);

  /** Lista completa de pedidos cargados, mapeados al modelo de vista */
  pedidos = signal<PedidoViewModel[]>([]);

  /** Determina si se muestran solo los pedidos del usuario actual (true) o todos (false) */
  soloMios = signal(true);

  /** Orden de precio aplicado: null = sin orden, 'asc' = menor a mayor, 'desc' = mayor a menor */
  ordenPrecio = signal<'asc' | 'desc' | null>(null);

  /** Texto de búsqueda para filtrar pedidos por su ID */
  searchId = signal('');

  /** Fecha de inicio del rango para filtrar pedidos por fecha */
  fechaDesde = signal<string>('');

  /** Fecha de fin del rango para filtrar pedidos por fecha */
  fechaHasta = signal<string>('');
  // #endregion

  // #region Señales computadas
  /**
   * Señal computada que aplica todos los filtros activos sobre la lista de pedidos.
   *
   * Filtros aplicados en orden:
   * 1. Búsqueda por ID del pedido (coincidencia parcial).
   * 2. Filtro por fecha de inicio (fechaDesde).
   * 3. Filtro por fecha de fin (fechaHasta).
   * 4. Ordenación por precio total (ascendente o descendente).
   *
   * @returns Lista de pedidos filtrados y ordenados según los criterios activos.
   */
  pedidosFiltrados = computed(() => {
    let resultado = this.pedidos();

    // Filtro por ID del pedido (búsqueda parcial)
    const busqueda = this.searchId().trim();
    if (busqueda) {
      resultado = resultado.filter(p => p.id.toString().includes(busqueda));
    }

    // Filtro por fecha de inicio — solo incluye pedidos desde esta fecha
    const desde = this.fechaDesde();
    if (desde) {
      const fechaDesde = new Date(desde);
      fechaDesde.setHours(0, 0, 0, 0);
      resultado = resultado.filter(p => new Date(p.fecha) >= fechaDesde);
    }

    // Filtro por fecha de fin — solo incluye pedidos hasta esta fecha
    const hasta = this.fechaHasta();
    if (hasta) {
      const fechaHasta = new Date(hasta);
      fechaHasta.setHours(23, 59, 59, 999);
      resultado = resultado.filter(p => new Date(p.fecha) <= fechaHasta);
    }

    // Ordenación por precio total si está activada
    const orden = this.ordenPrecio();
    if (orden) {
      resultado = [...resultado].sort((a, b) => orden === 'asc' ? a.precioTotal - b.precioTotal : b.precioTotal - a.precioTotal);
    }
    return resultado;
  });
  // #endregion

  // #region Constructor
  /**
   * Inyecta el repositorio de pedidos y el servicio de autenticación.
   *
   * @param pedidoRepo - Repositorio de pedidos (inyectado vía token).
   * @param authService - Servicio de autenticación para obtener el usuario actual.
   */
  constructor(
    @Inject(PEDIDO_REPOSITORY_TOKEN) private readonly pedidoRepo: IPedidoRepository,
    private readonly authService: AuthService
  ) {}
  // #endregion

  // #region Métodos públicos
  /**
   * Carga los pedidos desde el repositorio.
   *
   * Si `soloMios` es true y hay un usuario autenticado, carga solo sus pedidos.
   * En caso contrario, carga todos los pedidos del sistema.
   * Los pedidos se ordenan de más reciente a más antiguo antes de mostrarse.
   *
   * @param forceReload - Si es true, recarga los pedidos aunque ya haya datos en memoria.
   */
  cargarPedidos(forceReload = false): void {
    // Evita recargar si ya hay datos y no se fuerza la recarga
    if (!forceReload && this.pedidos().length > 0) return;
    this.isLoading.set(true);
    this.errorMessage.set(null);

    // Obtiene el ID del usuario autenticado para filtrar si aplica
    const userId = this.authService.getCurrentUser()?.id;
    const obs = this.soloMios() && userId
      ? this.pedidoRepo.getByUsuarioId(userId)
      : this.pedidoRepo.getAll();

    obs.pipe(
      map(pedidos =>
        pedidos
          // Ordena de más reciente a más antiguo por fecha
          .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
          .map(p => this.mapToViewModel(p))
      ),
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (data) => this.pedidos.set(data),
      error: (err) => this.errorMessage.set(err.message || 'Error al cargar pedidos.'),
    });
  }

  /**
   * Alterna entre mostrar solo los pedidos del usuario actual o todos los pedidos.
   * Recarga los pedidos automáticamente tras el cambio.
   */
  toggleSoloMios(): void {
    this.soloMios.set(!this.soloMios());
    this.cargarPedidos(true);
  }

  /**
   * Alterna el orden de precio en ciclo: sin orden → ascendente → descendente → sin orden.
   * Este ciclo permite al usuario ordenar por precio de forma intuitiva.
   */
  toggleOrdenPrecio(): void {
    const actual = this.ordenPrecio();
    if (actual === null) this.ordenPrecio.set('asc');
    else if (actual === 'asc') this.ordenPrecio.set('desc');
    else this.ordenPrecio.set(null);
  }
  // #endregion

  // #region Métodos privados
  /**
   * Convierte una entidad Pedido del dominio al modelo de vista PedidoViewModel.
   *
   * Transforma los datos crudos del pedido a un formato adecuado para la UI,
   * incluyendo la fecha formateada en español, el precio con formato de moneda
   * y la información de estado (color e icono).
   *
   * @param p - Entidad Pedido del dominio.
   * @returns Objeto PedidoViewModel con los datos formateados para la vista.
   */
  private mapToViewModel(p: Pedido): PedidoViewModel {
    const estadoInfo = ESTADOS_PEDIDO[p.estado as keyof typeof ESTADOS_PEDIDO];
    return {
      id: p.id,
      fecha: p.fecha,
      fechaFormateada: new Date(p.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      proveedorNombre: '',
      precioTotal: p.precioTotal,
      precioTotalFormateado: new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(p.precioTotal),
      estado: p.estado,
      estadoColor: estadoInfo?.color || '#6B7280',
      estadoIcon: estadoInfo?.icon || '📋',
      usuarioNombre: '',
    };
  }
  // #endregion
}
