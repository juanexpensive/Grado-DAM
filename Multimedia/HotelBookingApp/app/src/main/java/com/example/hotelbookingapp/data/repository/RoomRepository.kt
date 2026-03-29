package com.example.hotelbookingapp.data.repository

import com.example.hotelbookingapp.data.dao.RoomDao
import com.example.hotelbookingapp.data.entity.Room
import kotlinx.coroutines.flow.Flow

/**
 * Repository para operaciones relacionadas con habitaciones
 */
class RoomRepository(private val roomDao: RoomDao) {
    
    /**
     * Inserta una nueva habitación
     */
    suspend fun insertRoom(room: Room): Long {
        return roomDao.insert(room)
    }
    
    /**
     * Inserta múltiples habitaciones
     */
    suspend fun insertRooms(rooms: List<Room>) {
        roomDao.insertAll(rooms)
    }
    
    /**
     * Obtiene una habitación por su ID
     */
    suspend fun getRoomById(roomId: Long): Room? {
        return roomDao.getRoomById(roomId)
    }
    
    /**
     * Obtiene todas las habitaciones como Flow
     */
    fun getAllRooms(): Flow<List<Room>> {
        return roomDao.getAllRooms()
    }
    
    /**
     * Obtiene solo las habitaciones disponibles
     */
    fun getAvailableRooms(): Flow<List<Room>> {
        return roomDao.getAvailableRooms()
    }
    
    /**
     * Obtiene habitaciones por tipo
     */
    fun getRoomsByType(type: String): Flow<List<Room>> {
        return roomDao.getRoomsByType(type)
    }
    
    /**
     * Actualiza la disponibilidad de una habitación
     */
    suspend fun updateRoomAvailability(roomId: Long, isAvailable: Boolean) {
        roomDao.updateAvailability(roomId, isAvailable)
    }
    
    /**
     * Actualiza los datos de una habitación
     */
    suspend fun updateRoom(room: Room) {
        roomDao.update(room)
    }
    
    /**
     * Elimina una habitación
     */
    suspend fun deleteRoom(room: Room) {
        roomDao.delete(room)
    }
    
    /**
     * Obtiene el número de habitaciones disponibles
     */
    suspend fun getAvailableRoomsCount(): Int {
        return roomDao.getAvailableRoomsCount()
    }
}
