package com.example.hostal.database

import androidx.room.Embedded
import androidx.room.Relation

data class UsuarioConReservas(
    @Embedded val usuario: Usuario,
    @Relation(
        parentColumn = "id",
        entityColumn = "usuarioId"
    )
    val reservas: List<Reserva>
)

