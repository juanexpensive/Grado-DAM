/**
 * ViewModel para la búsqueda y listado de productos.
 *
 * Gestiona la carga de productos, categorías y empresas proveedoras,
 * y proporciona filtrado en tiempo real por texto, categoría, proveedor y precio.
 * Solo muestra productos activos (activo = true).
 */

// #region Imports
import { Injectable, Inject, signal, computed } from '@angular/core';
import { forkJoin } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Producto } from '../../../domain/entities/producto.entity';
import { Categoria } from '../../../domain/entities/categoria.entity';
import { Empresa } from '../../../domain/entities/empresa.entity';
import { IProductoRepository } from '../../../domain/interfaces/repositories/i-producto.repository';
import { ICategoriaRepository } from '../../../domain/interfaces/repositories/i-categoria.repository';
import { IEmpresaRepository } from '../../../domain/interfaces/repositories/i-empresa.repository';
import { PRODUCTO_REPOSITORY_TOKEN, CATEGORIA_REPOSITORY_TOKEN, EMPRESA_REPOSITORY_TOKEN } from '../../../di/types/injection.tokens';
import { ProductoViewModel } from '../../models/producto-view.model';
// #endregion

@Injectable({ providedIn: 'root' })
export class BusquedaProductosViewModel {

  // #region Señales de estado
  /** Indica si se están cargando los datos desde la API */
  isLoading = signal(false);

  /** Mensaje de error en caso de fallo al cargar datos */
  errorMessage = signal<string | null>(null);

  /** Lista completa de productos activos mapeados al modelo de vista */
  productos = signal<ProductoViewModel[]>([]);

  /** Lista de todas las categorías disponibles */
  categorias = signal<Categoria[]>([]);

  /** Lista de todas las empresas proveedoras, ordenadas alfabéticamente */
  empresas = signal<Empresa[]>([]);
  // #endregion

  // #region Señales de filtros
  /** Texto de búsqueda libre para filtrar por nombre o descripción del producto */
  searchText = signal('');

  /** ID de la categoría seleccionada para filtrar (null = todas) */
  selectedCategoriaId = signal<number | null>(null);

  /** ID del proveedor seleccionado para filtrar (null = todos) */
  selectedProveedorId = signal<number | null>(null);

  /** Orden de precio: null = sin orden, 'asc' = menor a mayor, 'desc' = mayor a menor */
  ordenPrecio = signal<'asc' | 'desc' | null>(null);
  // #endregion

  // #region Señales computadas
  /**
   * Señal computada que aplica todos los filtros activos sobre la lista de productos.
   *
   * Filtros aplicados:
   * 1. Por categoría seleccionada.
   * 2. Por proveedor seleccionado.
   * 3. Por texto de búsqueda (coincidencia parcial en nombre o descripción).
   * 4. Ordenación por precio (ascendente o descendente).
   *
   * @returns Lista de productos filtrados y ordenados según los criterios activos.
   */
  productosFiltrados = computed(() => {
    const catId = this.selectedCategoriaId();
    const provId = this.selectedProveedorId();
    const text = this.searchText().toLowerCase();
    const orden = this.ordenPrecio();

    // Aplica filtros combinados de categoría, proveedor y texto
    let resultado = this.productos().filter(p => {
      const matchCategoria = !catId || p.categoriaNombre === this.categorias().find(c => c.id === catId)?.nombre;
      const matchProveedor = !provId || p.idEmpresaProveedora === provId;
      const matchText = !text || p.nombre.toLowerCase().includes(text) || p.descripcion.toLowerCase().includes(text);
      return matchCategoria && matchProveedor && matchText;
    });

    // Aplica ordenación por precio si está activada
    if (orden) {
      resultado = [...resultado].sort((a, b) => orden === 'asc' ? a.precio - b.precio : b.precio - a.precio);
    }
    return resultado;
  });
  // #endregion

  // #region Métodos públicos de filtro
  /**
   * Alterna el orden de precio en ciclo: sin orden → ascendente → descendente → sin orden.
   */
  toggleOrdenPrecio(): void {
    const actual = this.ordenPrecio();
    if (actual === null) this.ordenPrecio.set('asc');
    else if (actual === 'asc') this.ordenPrecio.set('desc');
    else this.ordenPrecio.set(null);
  }
  // #endregion

  // #region Constructor
  /**
   * @param productoRepo - Repositorio de productos para cargar el catálogo.
   * @param categoriaRepo - Repositorio de categorías para el filtro de categorías.
   * @param empresaRepo - Repositorio de empresas para el filtro de proveedores.
   */
  constructor(
    @Inject(PRODUCTO_REPOSITORY_TOKEN) private readonly productoRepo: IProductoRepository,
    @Inject(CATEGORIA_REPOSITORY_TOKEN) private readonly categoriaRepo: ICategoriaRepository,
    @Inject(EMPRESA_REPOSITORY_TOKEN) private readonly empresaRepo: IEmpresaRepository
  ) {}
  // #endregion

  // #region Métodos públicos
  /**
   * Carga todos los datos necesarios para la pantalla de búsqueda.
   *
   * Realiza peticiones en paralelo (forkJoin) para obtener:
   * - Todas las categorías.
   * - Todos los productos (se filtran solo los activos).
   * - Todas las empresas proveedoras (se ordenan alfabéticamente).
   *
   * @param forceReload - Si es true, recarga los datos aunque ya existan en memoria.
   */
  cargarDatos(forceReload = false): void {
    if (!forceReload && this.productos().length > 0) return;
    this.isLoading.set(true);
    this.errorMessage.set(null);

    forkJoin({
      categorias: this.categoriaRepo.getAll(),
      productos: this.productoRepo.getAll(),
      empresas: this.empresaRepo.getAll(),
    })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: ({ categorias, productos, empresas }) => {
          this.categorias.set(categorias);
          // Ordena las empresas alfabéticamente por nombre
          this.empresas.set([...empresas].sort((a, b) => a.nombre.localeCompare(b.nombre)));
          // Filtra solo productos activos y los mapea al modelo de vista
          this.productos.set(
            productos
              .filter(p => p.activo)
              .map(p => this.mapToViewModel(p, categorias, empresas))
          );
        },
        error: (err) => this.errorMessage.set(err.message || 'Error al cargar productos.'),
      });
  }
  // #endregion

  // #region Métodos privados
  /**
   * Convierte una entidad Producto del dominio al modelo de vista ProductoViewModel.
   *
   * Resuelve el nombre de la categoría y del proveedor asociados al producto,
   * y formatea el precio en euros con formato español.
   *
   * @param p - Entidad Producto del dominio.
   * @param cats - Lista de categorías para resolver nombres (opcional, usa las cargadas).
   * @param emps - Lista de empresas para resolver nombres (opcional, usa las cargadas).
   * @returns Objeto ProductoViewModel con los datos formateados para la vista.
   */
  private mapToViewModel(p: Producto, cats?: Categoria[], emps?: Empresa[]): ProductoViewModel {
    const categorias = cats ?? this.categorias();
    const empresas = emps ?? this.empresas();
    const empresa = empresas.find(e => e.id === p.idEmpresaProveedora);
    return {
      id: p.id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
      precioFormateado: new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(p.precio),
      stock: p.stock,
      categoriaNombre: categorias.find(c => c.id === p.idCategoria)?.nombre || 'Sin categoría',
      proveedorNombre: empresa?.nombre || 'Sin proveedor',
      idEmpresaProveedora: p.idEmpresaProveedora,
      enStock: p.stock > 0,
    };
  }
  // #endregion
}
