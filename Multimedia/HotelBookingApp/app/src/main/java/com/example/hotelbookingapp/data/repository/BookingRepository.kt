package com.example.hotelbookingapp.data.repository

import com.example.hotelbookingapp.data.dao.BookingDao
import com.example.hotelbookingapp.data.entity.Booking
import com.example.hotelbookingapp.data.entity.BookingStatus
import com.example.hotelbookingapp.data.entity.BookingWithDetails
import kotlinx.coroutines.flow.Flow

/**
 * Repository para operaciones relacionadas con reservas
 */
class BookingRepository(private val bookingDao: BookingDao) {
    
    /**
     * Crea una nueva reserva
     * @return ID de la reserva creada
     */
    suspend fun createBooking(booking: Booking): Long {
        return bookingDao.insert(booking)
    }
    
    /**
     * Obtiene una reserva por su ID
     */
    suspend fun getBookingById(bookingId: Long): Booking? {
        return bookingDao.getBookingById(bookingId)
    }
    
    /**
     * Obtiene todas las reservas de un usuario con sus detalles
     */
    fun getBookingsWithDetailsByUser(userId: Long): Flow<List<BookingWithDetails>> {
        return bookingDao.getBookingsWithDetailsByUser(userId)
    }
    
    /**
     * Obtiene una reserva con sus detalles completos
     */
    suspend fun getBookingWithDetails(bookingId: Long): BookingWithDetails? {
        return bookingDao.getBookingWithDetails(bookingId)
    }
    
    /**
     * Obtiene todas las reservas
     */
    fun getAllBookings(): Flow<List<Booking>> {
        return bookingDao.getAllBookings()
    }
    
    /**
     * Obtiene las reservas de un usuario
     */
    fun getBookingsByUser(userId: Long): Flow<List<Booking>> {
        return bookingDao.getBookingsByUser(userId)
    }
    
    /**
     * Obtiene las reservas de un usuario filtradas por estado
     */
    fun getBookingsByUserAndStatus(userId: Long, status: BookingStatus): Flow<List<Booking>> {
        return bookingDao.getBookingsByUserAndStatus(userId, status)
    }
    
    /**
     * Cancela una reserva
     */
    suspend fun cancelBooking(bookingId: Long) {
        bookingDao.updateStatus(bookingId, BookingStatus.CANCELLED)
    }
    
    /**
     * Completa una reserva
     */
    suspend fun completeBooking(bookingId: Long) {
        bookingDao.updateStatus(bookingId, BookingStatus.COMPLETED)
    }
    
    /**
     * Actualiza el estado de una reserva
     */
    suspend fun updateBookingStatus(bookingId: Long, status: BookingStatus) {
        bookingDao.updateStatus(bookingId, status)
    }
    
    /**
     * Actualiza los datos de una reserva
     */
    suspend fun updateBooking(booking: Booking) {
        bookingDao.update(booking)
    }
    
    /**
     * Elimina una reserva
     */
    suspend fun deleteBooking(booking: Booking) {
        bookingDao.delete(booking)
    }
    
    /**
     * Verifica si una habitación está disponible en una fecha específica
     */
    suspend fun isRoomAvailable(roomId: Long, checkInDate: Long, checkOutDate: Long): Boolean {
        val bookings = bookingDao.getActiveBookingsForRoomOnDate(roomId, checkInDate)
        return bookings.isEmpty()
    }
    
    /**
     * Elimina todas las reservas de un usuario
     */
    suspend fun deleteBookingsByUser(userId: Long) {
        bookingDao.deleteBookingsByUser(userId)
    }
}
