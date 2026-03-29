package com.example.hotelbookingapp.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

/**
 * Entidad que representa una habitación del hotel
 */
@Entity(tableName = "rooms")
data class Room(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val roomNumber: String,
    val type: String, // Single, Double, Suite, etc.
    val description: String,
    val pricePerNight: Double,
    val capacity: Int,
    val amenities: String, // WiFi, TV, Minibar, etc. (separados por comas)
    val imageUrl: String = "", // URL de la imagen (opcional)
    val isAvailable: Boolean = true
)
