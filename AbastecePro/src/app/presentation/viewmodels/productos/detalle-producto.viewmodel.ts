/**
 * ViewModel para la pantalla de detalle de un producto.
 *
 * Carga los datos completos de un producto específico, incluyendo
 * información de su categoría y de la empresa proveedora asociada.
 * Utiliza peticiones anidadas: primero obtiene el producto y luego
 * resuelve la categoría y empresa en paralelo mediante forkJoin.
 */

// #region Imports
import { Injectable, Inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IProductoRepository } from '../../../domain/interfaces/repositories/i-producto.repository';
import { IEmpresaRepository } from '../../../domain/interfaces/repositories/i-empresa.repository';
import { ICategoriaRepository } from '../../../domain/interfaces/repositories/i-categoria.repository';
import {
  PRODUCTO_REPOSITORY_TOKEN,
  EMPRESA_REPOSITORY_TOKEN,
  CATEGORIA_REPOSITORY_TOKEN,
} from '../../../di/types/injection.tokens';
// #endregion

// #region Interfaces
/**
 * Modelo de vista para el detalle completo de un producto.
 * Incluye datos del producto, su categoría y datos de contacto del proveedor.
 */
export interface DetalleProductoView {
  /** Identificador único del producto */
  id: number;
  /** Nombre del producto */
  nombre: string;
  /** Descripción detallada del producto */
  descripcion: string;
  /** Precio unitario en euros */
  precio: number;
  /** Precio formateado con símbolo de moneda (ej: "12,50 €") */
  precioFormateado: string;
  /** Unidades disponibles en inventario */
  stock: number;
  /** Indica si hay stock disponible (stock > 0) */
  enStock: boolean;
  /** Nombre de la categoría a la que pertenece el producto */
  categoriaNombre: string;
  /** ID de la empresa proveedora */
  idEmpresaProveedora: number;
  /** Nombre de la empresa proveedora */
  proveedorNombre: string;
  /** Teléfono de contacto del proveedor */
  proveedorTelefono: string;
  /** Correo electrónico del proveedor */
  proveedorCorreo: string;
}
// #endregion

@Injectable({ providedIn: 'root' })
export class DetalleProductoViewModel {

  // #region Señales de estado
  /** Indica si se están cargando los datos del producto */
  isLoading = signal(false);

  /** Mensaje de error en caso de fallo al cargar el producto */
  errorMessage = signal<string | null>(null);

  /** Datos completos del producto cargado, null si aún no se ha cargado */
  producto = signal<DetalleProductoView | null>(null);
  // #endregion

  // #region Constructor
  /**
   * @param productoRepo - Repositorio de productos para obtener el producto por ID.
   * @param empresaRepo - Repositorio de empresas para resolver el proveedor.
   * @param categoriaRepo - Repositorio de categorías para resolver la categoría.
   */
  constructor(
    @Inject(PRODUCTO_REPOSITORY_TOKEN) private readonly productoRepo: IProductoRepository,
    @Inject(EMPRESA_REPOSITORY_TOKEN) private readonly empresaRepo: IEmpresaRepository,
    @Inject(CATEGORIA_REPOSITORY_TOKEN) private readonly categoriaRepo: ICategoriaRepository,
  ) {}
  // #endregion

  // #region Métodos públicos
  /**
   * Carga el detalle completo de un producto dado su ID.
   *
   * Flujo de carga:
   * 1. Obtiene el producto por ID desde la API.
   * 2. Con los IDs de categoría y empresa del producto, lanza en paralelo
   *    (forkJoin) la carga de la categoría y la empresa proveedora.
   * 3. Compone el modelo de vista DetalleProductoView con todos los datos.
   *
   * En caso de error en cualquier paso, se muestra un mensaje descriptivo.
   *
   * @param id - ID del producto a cargar.
   */
  cargarDetalle(id: number): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    // Paso 1: Obtener el producto
    this.productoRepo.getById(id).subscribe({
      next: (prod) => {
        // Paso 2: Obtener categoría y empresa en paralelo
        forkJoin({
          empresa: this.empresaRepo.getById(prod.idEmpresaProveedora),
          categoria: this.categoriaRepo.getById(prod.idCategoria),
        })
          .pipe(finalize(() => this.isLoading.set(false)))
          .subscribe({
            next: ({ empresa, categoria }) => {
              // Paso 3: Componer el modelo de vista con todos los datos
              this.producto.set({
                id: prod.id,
                nombre: prod.nombre,
                descripcion: prod.descripcion,
                precio: prod.precio,
                precioFormateado: new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(prod.precio),
                stock: prod.stock,
                enStock: prod.stock > 0,
                categoriaNombre: categoria.nombre,
                idEmpresaProveedora: prod.idEmpresaProveedora,
                proveedorNombre: empresa.nombre,
                proveedorTelefono: empresa.telefono,
                proveedorCorreo: empresa.correo,
              });
            },
            error: (err) => this.errorMessage.set(err.message || 'Error al cargar detalles.'),
          });
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message || 'Producto no encontrado.');
      },
    });
  }
  // #endregion
}
