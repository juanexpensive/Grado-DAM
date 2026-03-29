package com.example.hostal.database

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "habitaciones")
data class Habitacion(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val numero: Int,
    val piso: Int,
    val tipo: String,
    val capacidad: Int,
    val disponible: Boolean
)