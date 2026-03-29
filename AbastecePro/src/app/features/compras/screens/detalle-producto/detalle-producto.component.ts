/**
 * @fileoverview Componente de detalle de producto.
 * Muestra la información completa de un producto, datos de su proveedor
 * y permite añadirlo al carrito de compras con animación de confirmación.
 */

// #region Imports
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleProductoViewModel } from '../../../../presentation/viewmodels/productos/detalle-producto.viewmodel';
import { CarritoViewmodel } from '../../../../presentation/viewmodels/productos/carrito.viewmodel';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
// #endregion

// #region Componente
@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, ErrorMessageComponent, CurrencyFormatPipe],
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
})
export class DetalleProductoComponent implements OnInit {
  /** Indica si se acaba de añadir al carrito (para feedback visual temporal) */
  addedToCart = false;
  /** Referencia al timeout de la animación de añadido */
  private addedTimeout: ReturnType<typeof setTimeout> | null = null;

  /**
   * @param vm ViewModel que gestiona la carga del detalle del producto
   * @param carrito ViewModel del carrito de compras compartido
   * @param route Ruta activa para obtener el parámetro `:id`
   * @param router Servicio de navegación de Angular
   */
  constructor(
    public readonly vm: DetalleProductoViewModel,
    public readonly carrito: CarritoViewmodel,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  /** Extrae el ID de la URL y solicita al ViewModel que cargue el detalle del producto */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) this.vm.cargarDetalle(id);
  }

  /**
   * Añade el producto actual al carrito de compras.
   * Muestra un feedback visual temporal de 1.5 segundos al añadir exitosamente.
   */
  agregarAlCarrito(): void {
    const p = this.vm.producto();
    if (!p) return;
    const added = this.carrito.agregarProducto({
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      stock: p.stock,
      idEmpresaProveedora: p.idEmpresaProveedora,
      proveedorNombre: p.proveedorNombre,
    });
    if (!added) return;
    if (this.addedTimeout) clearTimeout(this.addedTimeout);
    this.addedToCart = true;
    this.addedTimeout = setTimeout(() => { this.addedToCart = false; }, 1500);
  }

  /** Navega de vuelta al catálogo de productos */
  volver(): void {
    this.router.navigate(['/compras']);
  }

  /** Navega a la pantalla del carrito de compras */
  irAlCarrito(): void {
    this.router.navigate(['/compras/carrito']);
  }
}
// #endregion
