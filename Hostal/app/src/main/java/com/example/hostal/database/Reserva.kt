package com.example.hostal.database

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "reservas")
data class Reserva(
    @PrimaryKey (autoGenerate = true)
    val id: Int = 0,
    val usuarioId: Int,
    val habitacionId: Int,
)