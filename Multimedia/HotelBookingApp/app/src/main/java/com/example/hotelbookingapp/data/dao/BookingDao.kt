package com.example.hotelbookingapp.data.dao

import androidx.room.*
import com.example.hotelbookingapp.data.entity.Booking
import com.example.hotelbookingapp.data.entity.BookingStatus
import com.example.hotelbookingapp.data.entity.BookingWithDetails
import kotlinx.coroutines.flow.Flow

/**
 * Data Access Object para operaciones con la tabla Bookings
 * Incluye consultas con relaciones usando @Transaction
 */
@Dao
interface BookingDao {
    
    @Insert(onConflict = OnConflictStrategy.ABORT)
    suspend fun insert(booking: Booking): Long
    
    @Update
    suspend fun update(booking: Booking)
    
    @Delete
    suspend fun delete(booking: Booking)
    
    @Query("SELECT * FROM bookings WHERE id = :bookingId")
    suspend fun getBookingById(bookingId: Long): Booking?
    
    @Query("SELECT * FROM bookings")
    fun getAllBookings(): Flow<List<Booking>>
    
    @Query("SELECT * FROM bookings WHERE userId = :userId")
    fun getBookingsByUser(userId: Long): Flow<List<Booking>>
    
    @Query("SELECT * FROM bookings WHERE userId = :userId AND status = :status")
    fun getBookingsByUserAndStatus(userId: Long, status: BookingStatus): Flow<List<Booking>>
    
    @Transaction
    @Query("SELECT * FROM bookings WHERE userId = :userId ORDER BY createdAt DESC")
    fun getBookingsWithDetailsByUser(userId: Long): Flow<List<BookingWithDetails>>
    
    @Transaction
    @Query("SELECT * FROM bookings WHERE id = :bookingId")
    suspend fun getBookingWithDetails(bookingId: Long): BookingWithDetails?
    
    @Query("UPDATE bookings SET status = :status WHERE id = :bookingId")
    suspend fun updateStatus(bookingId: Long, status: BookingStatus)
    
    @Query("SELECT * FROM bookings WHERE roomId = :roomId AND status = 'ACTIVE' AND checkInDate <= :date AND checkOutDate >= :date")
    suspend fun getActiveBookingsForRoomOnDate(roomId: Long, date: Long): List<Booking>
    
    @Query("DELETE FROM bookings WHERE userId = :userId")
    suspend fun deleteBookingsByUser(userId: Long)
}
