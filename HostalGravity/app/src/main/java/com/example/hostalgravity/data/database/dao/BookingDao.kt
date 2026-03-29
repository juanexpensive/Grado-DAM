package com.example.hostalgravity.data.database.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update
import com.example.hostalgravity.data.database.entities.BookingEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface BookingDao {
    @Query("SELECT * FROM bookings WHERE userId = :userId ORDER BY checkInDate DESC")
    fun getBookingsByUserId(userId: Long): Flow<List<BookingEntity>>
    
    @Query("SELECT * FROM bookings ORDER BY checkInDate DESC")
    fun getAllBookings(): Flow<List<BookingEntity>>
    
    @Query("SELECT * FROM bookings WHERE isCancelled = 0 AND isCompleted = 0")
    fun getActiveBookings(): Flow<List<BookingEntity>>
    
    @Query("SELECT * FROM bookings WHERE id = :id")
    suspend fun getBookingById(id: Long): BookingEntity?
    
    @Insert
    suspend fun insertBooking(booking: BookingEntity): Long
    
    @Update
    suspend fun updateBooking(booking: BookingEntity)
    
    @Query("UPDATE bookings SET isCancelled = 1 WHERE id = :bookingId")
    suspend fun cancelBooking(bookingId: Long)
    
    @Query("UPDATE bookings SET isCompleted = 1 WHERE id = :bookingId")
    suspend fun completeBooking(bookingId: Long)
    
    @Query("SELECT * FROM bookings WHERE roomId = :roomId AND isCancelled = 0 AND isCompleted = 0")
    suspend fun getActiveBookingForRoom(roomId: Long): BookingEntity?
}
