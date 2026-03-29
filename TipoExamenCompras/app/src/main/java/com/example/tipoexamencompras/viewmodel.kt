package com.example.tipoexamencompras

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import kotlin.random.Random

class AppViewModel : ViewModel() {
    private val products = listOf(
        Product("Libro"), Product("Auriculares"), Product("Camiseta"),
        Product("Reloj"), Product("Puzzle"), Product("Mochila")
    )


    var selectedProduct by mutableStateOf<Product?>(null)
    var marketPrice by mutableStateOf(0)
    var credits by mutableStateOf(10)
    var inventory = mutableStateListOf<InventoryItem>()
    var errorMessage by mutableStateOf("")


    fun getProducts() = products


    fun selectProduct(p: Product) {
        selectedProduct = p
        errorMessage = ""
    }


    fun generarPrecioMercado() {
        selectedProduct?.let {
            val variation = Random.nextDouble(0.8, 1.2) // -20% a +20%
            marketPrice = (it.basePrice * variation).toInt().coerceAtLeast(1)
        }
    }


    fun confirmarCompra(onSuccess: () -> Unit) {
        if (credits >= marketPrice) {
            credits -= marketPrice
            generarInventarioTrasCompra()
            onSuccess()
        } else {
            errorMessage = "Créditos insuficientes"
        }
    }


    fun generarInventarioTrasCompra() {
        selectedProduct?.let {
            val sellVar = Random.nextDouble(0.9, 1.1)
            val sellPrice = (marketPrice * sellVar).toInt().coerceAtLeast(1)
            inventory.add(InventoryItem(it.name, sellPrice))
        }
    }


    fun venderProducto(item: InventoryItem, onFinish: () -> Unit) {
        credits += item.sellPrice
        inventory.remove(item)
        onFinish()
    }
}