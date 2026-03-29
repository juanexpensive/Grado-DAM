/**
 * ViewModel del carrito de compras (Nuevo Pedido).
 *
 * Gestiona los productos añadidos al carrito antes de crear un pedido.
 * Restricción de negocio: todos los productos de un pedido deben pertenecer
 * al mismo proveedor. Si se intenta añadir un producto de otro proveedor,
 * se muestra un mensaje de error sin añadir el producto.
 * El carrito se persiste en localStorage para mantener los datos entre sesiones.
 */

// #region Imports
import { Injectable, Inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CarritoItemViewModel, CarritoViewModel } from '../../models/carrito-view.model';
import { STORAGE_KEYS } from '../../../shared/constants/app.constants';
// #endregion

@Injectable({ providedIn: 'root' })
export class CarritoViewmodel {

  // #region Señales de estado
  /** Lista de productos en el carrito con sus cantidades y subtotales */
  items = signal<CarritoItemViewModel[]>([]);

  /** Mensaje de error cuando se intenta mezclar productos de distintos proveedores */
  errorProveedor = signal<string | null>(null);
  // #endregion

  // #region Señales computadas
  /**
   * Número total de unidades en el carrito (suma de todas las cantidades).
   *
   * @returns Suma total de las cantidades de todos los ítems.
   */
  totalItems = computed(() => this.items().reduce((sum, item) => sum + item.cantidad, 0));

  /**
   * Precio total del carrito (suma de todos los subtotales).
   *
   * @returns Suma total en euros de todos los ítems del carrito.
   */
  precioTotal = computed(() => this.items().reduce((sum, item) => sum + item.subtotal, 0));

  /**
   * ID del proveedor actual del pedido.
   * Todos los productos deben ser del mismo proveedor.
   *
   * @returns ID del proveedor del primer ítem, o null si el carrito está vacío.
   */
  proveedorActual = computed(() => {
    const items = this.items();
    return items.length > 0 ? items[0].idEmpresaProveedora : null;
  });

  /**
   * Nombre del proveedor actual del pedido.
   *
   * @returns Nombre del proveedor o null si el carrito está vacío.
   */
  proveedorActualNombre = computed(() => {
    const items = this.items();
    return items.length > 0 ? items[0].proveedorNombre : null;
  });
  // #endregion

  // #region Propiedades privadas
  /** Indica si la aplicación se ejecuta en el navegador (para acceder a localStorage) */
  private isBrowser: boolean;
  // #endregion

  // #region Constructor
  /**
   * Inicializa el carrito cargando los datos previamente guardados en localStorage.
   *
   * @param platformId - Token de plataforma para detectar si estamos en el navegador.
   */
  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadFromStorage();
  }
  // #endregion

  // #region Persistencia en localStorage
  /**
   * Carga los ítems del carrito desde localStorage al inicializar.
   * Solo opera en el navegador (no en SSR).
   */
  private loadFromStorage(): void {
    if (!this.isBrowser) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART_ITEMS);
      if (stored) this.items.set(JSON.parse(stored));
    } catch {}
  }

  /**
   * Guarda el estado actual del carrito en localStorage.
   * Se ejecuta tras cada modificación del carrito.
   */
  private saveToStorage(): void {
    if (!this.isBrowser) return;
    localStorage.setItem(STORAGE_KEYS.CART_ITEMS, JSON.stringify(this.items()));
  }
  // #endregion

  // #region Métodos públicos
  /**
   * Añade un producto al carrito.
   *
   * Reglas de negocio:
   * 1. Solo permite productos del mismo proveedor que los ya existentes en el carrito.
   * 2. Si el producto ya existe, incrementa la cantidad en 1 (sin superar el stock).
   * 3. Si es un producto nuevo, lo añade con cantidad 1.
   *
   * @param producto - Datos del producto a añadir (id, nombre, precio, stock, proveedor).
   * @returns true si se añadió correctamente, false si no se pudo añadir.
   */
  agregarProducto(producto: { id: number; nombre: string; precio: number; stock: number; idEmpresaProveedora: number; proveedorNombre: string }): boolean {
    this.errorProveedor.set(null);
    const current = this.items();

    // Validación: proveedor único por pedido
    if (current.length > 0 && current[0].idEmpresaProveedora !== producto.idEmpresaProveedora) {
      this.errorProveedor.set(
        `Solo puedes añadir productos del proveedor "${current[0].proveedorNombre}". Vacía el pedido actual para cambiar de proveedor.`
      );
      return false;
    }

    // Si el producto ya está en el carrito, incrementa la cantidad
    const existente = current.find(i => i.idProducto === producto.id);
    if (existente) {
      // No permite superar el stock disponible
      if (existente.cantidad >= existente.stock) return false;
      this.items.set(current.map(i =>
        i.idProducto === producto.id
          ? { ...i, cantidad: i.cantidad + 1, subtotal: (i.cantidad + 1) * i.precioUnitario }
          : i
      ));
    } else {
      // Producto nuevo: lo añade al carrito con cantidad inicial de 1
      this.items.set([...current, {
        idProducto: producto.id,
        nombre: producto.nombre,
        precioUnitario: producto.precio,
        cantidad: 1,
        subtotal: producto.precio,
        stock: producto.stock,
        idEmpresaProveedora: producto.idEmpresaProveedora,
        proveedorNombre: producto.proveedorNombre,
      }]);
    }
    this.saveToStorage();
    return true;
  }

  /**
   * Elimina un producto del carrito por su ID.
   * También limpia el mensaje de error de proveedor ya que el carrito puede cambiar.
   *
   * @param idProducto - ID del producto a eliminar.
   */
  eliminarProducto(idProducto: number): void {
    this.items.set(this.items().filter(i => i.idProducto !== idProducto));
    this.errorProveedor.set(null);
    this.saveToStorage();
  }

  /**
   * Actualiza la cantidad de un producto específico en el carrito.
   *
   * Si la cantidad es 0 o menor, elimina el producto del carrito.
   * No permite superar el stock disponible del producto.
   *
   * @param idProducto - ID del producto cuya cantidad se va a actualizar.
   * @param cantidad - Nueva cantidad deseada.
   */
  actualizarCantidad(idProducto: number, cantidad: number): void {
    // Si la cantidad es 0 o negativa, elimina el producto
    if (cantidad <= 0) { this.eliminarProducto(idProducto); return; }
    // Valida que no se supere el stock disponible
    const item = this.items().find(i => i.idProducto === idProducto);
    if (item && cantidad > item.stock) return;
    // Actualiza la cantidad y recalcula el subtotal
    this.items.set(this.items().map(i =>
      i.idProducto === idProducto ? { ...i, cantidad, subtotal: cantidad * i.precioUnitario } : i
    ));
    this.saveToStorage();
  }

  /**
   * Vacía completamente el carrito eliminando todos los productos.
   * También limpia el mensaje de error de proveedor.
   */
  vaciarCarrito(): void {
    this.items.set([]);
    this.errorProveedor.set(null);
    this.saveToStorage();
  }
  // #endregion
}
