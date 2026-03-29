package com.example.tipoexamencompras

data class Product(val name: String, val basePrice: Int = 2)
data class InventoryItem(val name: String, val sellPrice: Int)