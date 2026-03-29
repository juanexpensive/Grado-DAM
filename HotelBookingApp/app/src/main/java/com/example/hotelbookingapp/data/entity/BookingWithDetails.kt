package com.example.hotelbookingapp.data.entity

import androidx.room.Embedded
import androidx.room.Relation

/**
 * Clase que representa una reserva con sus datos relacionados
 * Utiliza @Embedded y @Relation para mapear las relaciones en ROOM
 */
data class BookingWithDetails(
    @Embedded
    val booking: Booking,
    
    @Relation(
        parentColumn = "roomId",
        entityColumn = "id"
    )
    val room: Room,
    
    @Relation(
        parentColumn = "userId",
        entityColumn = "id"
    )
    val user: User
)
