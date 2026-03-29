/**
 * @fileoverview Componente de búsqueda y catálogo de productos.
 * Permite buscar por texto, filtrar por categoría y añadir productos al carrito.
 * Integra animaciones al añadir productos y lazy loading de datos.
 */

// #region Imports
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BusquedaProductosViewModel } from '../../../../presentation/viewmodels/productos/busqueda-productos.viewmodel';
import { CarritoViewmodel } from '../../../../presentation/viewmodels/productos/carrito.viewmodel';
import { SkeletonLoadingComponent } from '../../../../shared/components/loading/skeleton-loading.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { AnimatedListItemComponent } from '../../../../shared/components/animated-list-item/animated-list-item.component';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
import { ProductoViewModel } from '../../../../presentation/models/producto-view.model';
// #endregion

// #region Componente
@Component({
  selector: 'app-busqueda-productos',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    SkeletonLoadingComponent, ErrorMessageComponent,
    AnimatedListItemComponent, CurrencyFormatPipe
  ],
  templateUrl: './busqueda-productos.component.html',
  styleUrls: ['./busqueda-productos.component.scss'],
})
export class BusquedaProductosComponent implements OnInit {
  /** ID del producto recién añadido al carrito, usado para activar la animación visual */
  addedProductId: number | null = null;
  /** Referencia al timeout de la animación de añadido */
  private addedTimeout: ReturnType<typeof setTimeout> | null = null;

  /**
   * @param vm ViewModel que gestiona la búsqueda, filtrado y listado de productos
   * @param carrito ViewModel del carrito de compras compartido
   * @param router Servicio de navegación de Angular
   */
  constructor(
    public readonly vm: BusquedaProductosViewModel,
    public readonly carrito: CarritoViewmodel,
    private readonly router: Router
  ) {}

  /**
   * Carga los datos iniciales (productos y categorías).
   * Usa freshLoad del estado de navegación para forzar recarga desde la API.
   */
  ngOnInit(): void {
    const freshLoad = history.state?.freshLoad === true;
    this.vm.cargarDatos(freshLoad);
  }

  /**
   * Añade un producto al carrito con animación visual de confirmación.
   * Si el producto es de un proveedor diferente al del carrito actual, no se añade.
   * @param producto Datos del producto a añadir
   */
  agregarAlCarrito(producto: ProductoViewModel): void {
    const added = this.carrito.agregarProducto({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
      idEmpresaProveedora: producto.idEmpresaProveedora,
      proveedorNombre: producto.proveedorNombre,
    });
    if (!added) return; // No se añadió (proveedor diferente)
    if (this.addedTimeout) clearTimeout(this.addedTimeout);
    // Reset primero para permitir re-activar la animación en el mismo producto
    this.addedProductId = null;
    requestAnimationFrame(() => {
      this.addedProductId = producto.id;
      this.addedTimeout = setTimeout(() => { this.addedProductId = null; }, 1200);
    });
  }

  /** Navega a la pantalla del carrito de compras */
  irAlCarrito(): void {
    this.router.navigate(['/compras/carrito']);
  }

  /**
   * Navega a la pantalla de detalle del producto seleccionado.
   * @param producto Producto cuyo detalle se desea ver
   */
  verDetalleProducto(producto: ProductoViewModel): void {
    this.router.navigate(['/compras/producto', producto.id]);
  }

  /** Navega de vuelta al menú principal */
  volver(): void {
    this.router.navigate(['/home']);
  }
}
// #endregion
