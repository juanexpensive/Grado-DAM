/**
 * Servicio para generar facturas PDF de pedidos.
 *
 * Utiliza la librería jsPDF para crear documentos PDF descargables
 * con el formato de factura corporativa de AbastecePro.
 *
 * La factura incluye:
 * - Cabecera con logo de la empresa.
 * - Información del pedido (fecha, estado, solicitante, proveedor).
 * - Tabla detallada de productos con cantidades, precios y subtotales.
 * - Total del pedido.
 * - Pie de página con fecha de generación.
 */

// #region Imports
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { PedidoDetalleDto } from '../../domain/dtos/pedido/pedido-detalle.dto';
// #endregion

@Injectable({ providedIn: 'root' })
export class FacturaPdfService {

  // #region Métodos públicos
  /**
   * Genera y descarga automáticamente una factura PDF de un pedido.
   *
   * El documento se estructura en secciones:
   * 1. Cabecera con nombre de la empresa y subtítulo.
   * 2. Título de la factura con el número de pedido.
   * 3. Información contextual (fecha, estado, solicitante, proveedor).
   * 4. Tabla de productos con columnas: Producto, Cantidad, Precio/ud, Subtotal.
   * 5. Línea de total del pedido.
   * 6. Footer con marca de tiempo de generación.
   *
   * Si los productos exceden una página, se crea una nueva automáticamente.
   *
   * @param pedido - Datos completos del pedido incluyendo líneas de detalle.
   */
  generarFactura(pedido: PedidoDetalleDto): void {
    const doc = new jsPDF();
    const margenIzq = 20;
    let y = 20;

    // --- Sección: Cabecera corporativa ---
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(13, 115, 119); // Color primario de la marca (#0D7377)
    doc.text('AbastecePro', margenIzq, y);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Sistema de Gestión de Compras', margenIzq, y + 7);

    // --- Sección: Título de la factura ---
    y += 25;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`Factura - Pedido #${pedido.id}`, margenIzq, y);

    // Línea separadora decorativa
    y += 5;
    doc.setDrawColor(13, 115, 119);
    doc.setLineWidth(0.5);
    doc.line(margenIzq, y, 190, y);

    // --- Sección: Información del pedido ---
    y += 12;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);

    // Formatea la fecha en formato largo español (ej: "15 de enero de 2025")
    const fechaFormateada = new Date(pedido.fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    this.addInfoRow(doc, margenIzq, y, 'Fecha:', fechaFormateada);
    y += 7;
    this.addInfoRow(doc, margenIzq, y, 'Estado:', pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1));
    y += 7;
    if (pedido.usuarioNombre) {
      this.addInfoRow(doc, margenIzq, y, 'Solicitado por:', pedido.usuarioNombre);
      y += 7;
    }
    if (pedido.empresaProveedoraNombre) {
      this.addInfoRow(doc, margenIzq, y, 'Empresa proveedora:', pedido.empresaProveedoraNombre);
      y += 7;
    }

    // --- Sección: Tabla de productos ---
    y += 8;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Detalle de productos', margenIzq, y);

    y += 8;

    // Posiciones horizontales de cada columna
    const colX = { producto: margenIzq, cantidad: 100, precioUd: 130, subtotal: 165 };

    // Cabecera de la tabla con fondo de color primario
    doc.setFillColor(13, 115, 119);
    doc.rect(margenIzq - 2, y - 5, 174, 8, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('Producto', colX.producto, y);
    doc.text('Cantidad', colX.cantidad, y);
    doc.text('Precio/ud.', colX.precioUd, y);
    doc.text('Subtotal', colX.subtotal, y);

    // Filas de productos con fondo alterno para legibilidad
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(9);

    for (const linea of pedido.detalles) {
      // Si la posición Y supera el límite de la página, crea una nueva
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      // Aplica fondo gris claro en filas pares para efecto zebra
      const index = pedido.detalles.indexOf(linea);
      if (index % 2 === 0) {
        doc.setFillColor(245, 245, 245);
        doc.rect(margenIzq - 2, y - 5, 174, 7, 'F');
      }

      doc.text(linea.productoNombre, colX.producto, y);
      doc.text(linea.cantidadProducto.toString(), colX.cantidad, y);
      doc.text(this.formatCurrency(linea.precioUnitario), colX.precioUd, y);
      doc.text(this.formatCurrency(linea.subtotal), colX.subtotal, y);
      y += 7;
    }

    // --- Sección: Total del pedido ---
    y += 3;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(colX.precioUd - 5, y, 192, y);

    y += 8;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(13, 115, 119);
    doc.text('Total:', colX.precioUd, y);
    doc.text(this.formatCurrency(pedido.precioTotal), colX.subtotal, y);

    // --- Sección: Pie de página ---
    y += 20;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(150, 150, 150);
    doc.text('Documento generado automáticamente por AbastecePro.', margenIzq, y);
    doc.text(`Generado el ${new Date().toLocaleDateString('es-ES')} a las ${new Date().toLocaleTimeString('es-ES')}`, margenIzq, y + 5);

    // Descarga automática del PDF con nombre descriptivo
    doc.save(`factura-pedido-${pedido.id}.pdf`);
  }
  // #endregion

  // #region Métodos privados
  /**
   * Añade una fila de información con formato label: valor al documento PDF.
   *
   * @param doc - Instancia del documento jsPDF.
   * @param x - Posición horizontal de inicio.
   * @param y - Posición vertical de la fila.
   * @param label - Etiqueta descriptiva (se muestra en negrita).
   * @param value - Valor asociado (se muestra en fuente normal).
   */
  private addInfoRow(doc: jsPDF, x: number, y: number, label: string, value: string): void {
    doc.setFont('helvetica', 'bold');
    doc.text(label, x, y);
    doc.setFont('helvetica', 'normal');
    doc.text(value, x + 40, y);
  }

  /**
   * Formatea un número como moneda EUR con formato español.
   *
   * @param value - Cantidad numérica a formatear.
   * @returns Cadena formateada (ej: "1.234,56 €").
   */
  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value);
  }
  // #endregion
}
