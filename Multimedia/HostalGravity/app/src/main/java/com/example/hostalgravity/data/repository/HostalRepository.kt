package com.example.hostalgravity.data.repository

import com.example.hostalgravity.data.database.dao.BookingDao
import com.example.hostalgravity.data.database.dao.RoomDao
import com.example.hostalgravity.data.database.dao.UserDao
import com.example.hostalgravity.data.database.entities.BookingEntity
import com.example.hostalgravity.data.database.entities.RoomEntity
import com.example.hostalgravity.data.database.entities.UserEntity
import kotlinx.coroutines.flow.Flow

class HostalRepository(
    private val userDao: UserDao,
    private val roomDao: RoomDao,
    private val bookingDao: BookingDao
) {
    // User operations
    suspend fun login(username: String, password: String): UserEntity? {
        return userDao.getUserByCredentials(username, password)
    }
    
    suspend fun register(username: String, password: String): Result<Long> {
        val existingUser = userDao.getUserByUsername(username)
        return if (existingUser != null) {
            Result.failure(Exception("El usuario ya existe"))
        } else {
            val userId = userDao.insertUser(UserEntity(username = username, password = password))
            Result.success(userId)
        }
    }
    
    suspend fun getUserById(id: Long): UserEntity? {
        return userDao.getUserById(id)
    }
    
    // Room operations
    fun getAvailableRooms(): Flow<List<RoomEntity>> {
        return roomDao.getAvailableRooms()
    }
    
    fun getAllRooms(): Flow<List<RoomEntity>> {
        return roomDao.getAllRooms()
    }
    
    suspend fun getRoomById(id: Long): RoomEntity? {
        return roomDao.getRoomById(id)
    }
    
    suspend fun addRoom(room: RoomEntity): Long {
        return roomDao.insertRoom(room)
    }
    
    suspend fun updateRoomAvailability(roomId: Long, isAvailable: Boolean) {
        roomDao.updateRoomAvailability(roomId, isAvailable)
    }
    
    // Booking operations
    fun getBookingsByUserId(userId: Long): Flow<List<BookingEntity>> {
        return bookingDao.getBookingsByUserId(userId)
    }
    
    fun getAllBookings(): Flow<List<BookingEntity>> {
        return bookingDao.getAllBookings()
    }
    
    fun getActiveBookings(): Flow<List<BookingEntity>> {
        return bookingDao.getActiveBookings()
    }
    
    suspend fun createBooking(
        userId: Long,
        roomId: Long,
        checkInDate: Long,
        checkOutDate: Long
    ): Long {
        // Mark room as unavailable
        roomDao.updateRoomAvailability(roomId, false)
        
        // Create booking
        return bookingDao.insertBooking(
            BookingEntity(
                userId = userId,
                roomId = roomId,
                checkInDate = checkInDate,
                checkOutDate = checkOutDate
            )
        )
    }
    
    suspend fun cancelBooking(bookingId: Long) {
        val booking = bookingDao.getBookingById(bookingId) ?: return
        
        // Only cancel if not completed
        if (!booking.isCompleted) {
            bookingDao.cancelBooking(bookingId)
            // Room becomes available again
            roomDao.updateRoomAvailability(booking.roomId, true)
        }
    }
    
    suspend fun completeBooking(bookingId: Long) {
        val booking = bookingDao.getBookingById(bookingId) ?: return
        bookingDao.completeBooking(bookingId)
        // Room becomes available
        roomDao.updateRoomAvailability(booking.roomId, true)
    }
    
    suspend fun getActiveBookingForRoom(roomId: Long): BookingEntity? {
        return bookingDao.getActiveBookingForRoom(roomId)
    }
}
