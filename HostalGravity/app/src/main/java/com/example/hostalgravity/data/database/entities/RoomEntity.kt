package com.example.hostalgravity.data.database.entities

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "rooms")
data class RoomEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val roomNumber: String,
    val roomType: String, // "individual", "doble", "suite"
    val pricePerNight: Double,
    val description: String,
    val capacity: Int,
    val isAvailable: Boolean = true
)
