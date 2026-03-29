package com.example.hotelbookingapp.data.dao

import androidx.room.*
import androidx.room.OnConflictStrategy
import com.example.hotelbookingapp.data.entity.Room
import kotlinx.coroutines.flow.Flow

/**
 * Data Access Object para operaciones con la tabla Rooms
 */
@Dao
interface RoomDao {
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(room: Room): Long
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(rooms: List<Room>)
    
    @Update
    suspend fun update(room: Room)
    
    @Delete
    suspend fun delete(room: Room)
    
    @Query("SELECT * FROM rooms WHERE id = :roomId")
    suspend fun getRoomById(roomId: Long): Room?
    
    @Query("SELECT * FROM rooms")
    fun getAllRooms(): Flow<List<Room>>
    
    @Query("SELECT * FROM rooms WHERE isAvailable = 1")
    fun getAvailableRooms(): Flow<List<Room>>
    
    @Query("SELECT * FROM rooms WHERE type = :type")
    fun getRoomsByType(type: String): Flow<List<Room>>
    
    @Query("UPDATE rooms SET isAvailable = :isAvailable WHERE id = :roomId")
    suspend fun updateAvailability(roomId: Long, isAvailable: Boolean)
    
    @Query("SELECT COUNT(*) FROM rooms WHERE isAvailable = 1")
    suspend fun getAvailableRoomsCount(): Int
}
