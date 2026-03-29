package com.example.hotelbookingapp.data.database

import androidx.room.TypeConverter
import com.example.hotelbookingapp.data.entity.BookingStatus

/**
 * Converters para tipos personalizados en ROOM
 * Permite guardar enums y otros tipos complejos en la base de datos
 */
class Converters {
    
    @TypeConverter
    fun fromBookingStatus(status: BookingStatus): String {
        return status.name
    }
    
    @TypeConverter
    fun toBookingStatus(value: String): BookingStatus {
        return try {
            BookingStatus.valueOf(value)
        } catch (e: IllegalArgumentException) {
            BookingStatus.ACTIVE
        }
    }
}
