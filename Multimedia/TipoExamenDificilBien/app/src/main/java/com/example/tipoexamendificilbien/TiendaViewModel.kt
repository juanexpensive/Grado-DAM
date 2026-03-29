package com.example.tipoexamendificilbien

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlin.random.Random

data class Producto(
    val id: Int,
    val nombre: String,
    val precioBase: Int = 2
)

data class ProductoInventario(
    val producto: Producto,
    val precioCompra: Int
)

class TiendaViewModel : ViewModel() {
    private val productosDisponibles = listOf(
        Producto(1, "Laptop"),
        Producto(2, "Smartphone"),
        Producto(3, "Tablet"),
        Producto(4, "Auriculares"),
        Producto(5, "Teclado"),
        Producto(6, "Ratón"),
        Producto(7, "Monitor"),
        Producto(8, "Cámara"),
        Producto(9, "Impresora"),
        Producto(10, "Smartwatch")
    )

    private var _creditos = MutableStateFlow(10)
    var creditos: StateFlow<Int> = _creditos

    private var _productoSeleccionado = MutableStateFlow<Producto?>(null)
    var productoSeleccionado: StateFlow<Producto?> = _productoSeleccionado

    private var _precioMercado = MutableStateFlow(0)
    var precioMercado: StateFlow<Int> = _precioMercado

    private var _inventario = MutableStateFlow<List<ProductoInventario>>(emptyList())
    var inventario: StateFlow<List<ProductoInventario>> = _inventario

    private var _mensajeError = MutableStateFlow("")
    var mensajeError: StateFlow<String> = _mensajeError

    fun getProductosDisponibles(): List<Producto> = productosDisponibles

    fun seleccionarProducto(producto: Producto) {
        _productoSeleccionado.value = producto
        val variacion = Random.nextDouble(-0.2, 0.2)
        val precioConVariacion = producto.precioBase * (1 + variacion)
        _precioMercado.value = precioConVariacion.toInt().coerceAtLeast(1)
    }

    fun comprarProducto(): Boolean {
        val producto = _productoSeleccionado.value ?: return false
        val precio = _precioMercado.value

        if (_creditos.value >= precio) {
            _creditos.value -= precio
            _inventario.value = _inventario.value + ProductoInventario(producto, precio)
            _mensajeError.value = ""
            return true
        } else {
            _mensajeError.value = "No tienes créditos suficientes"
            return false
        }
    }

    fun calcularPrecioVenta(productoInventario: ProductoInventario): Int {
        val variacion = Random.nextDouble(-0.1, 0.1)
        val precioVenta = productoInventario.precioCompra * (1 + variacion)
        return precioVenta.toInt().coerceAtLeast(1)
    }

    fun venderProducto(productoInventario: ProductoInventario, precioVenta: Int) {
        _creditos.value += precioVenta
        _inventario.value = _inventario.value.filter { it != productoInventario }
    }

    fun limpiarSeleccion() {
        _productoSeleccionado.value = null
        _precioMercado.value = 0
        _mensajeError.value = ""
    }

    fun limpiarError() {
        _mensajeError.value = ""
    }
}

