package com.example.hotelbookingapp.data.entity

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.Index
import androidx.room.PrimaryKey

/**
 * Entidad que representa una reserva
 * Establece relaciones con User y Room mediante Foreign Keys
 */
@Entity(
    tableName = "bookings",
    foreignKeys = [
        ForeignKey(
            entity = User::class,
            parentColumns = ["id"],
            childColumns = ["userId"],
            onDelete = ForeignKey.CASCADE
        ),
        ForeignKey(
            entity = Room::class,
            parentColumns = ["id"],
            childColumns = ["roomId"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [
        Index(value = ["userId"]),
        Index(value = ["roomId"])
    ]
)
data class Booking(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val userId: Long,
    val roomId: Long,
    val checkInDate: Long,
    val checkOutDate: Long,
    val totalPrice: Double,
    val status: BookingStatus = BookingStatus.ACTIVE,
    val createdAt: Long = System.currentTimeMillis()
)

/**
 * Estados posibles de una reserva
 */
enum class BookingStatus {
    ACTIVE,      // Reserva activa
    CANCELLED,   // Reserva cancelada
    COMPLETED    // Reserva completada (fecha pasada)
}
