package com.example.hostalgravity.data.database.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update
import com.example.hostalgravity.data.database.entities.RoomEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface RoomDao {
    @Query("SELECT * FROM rooms WHERE isAvailable = 1")
    fun getAvailableRooms(): Flow<List<RoomEntity>>
    
    @Query("SELECT * FROM rooms")
    fun getAllRooms(): Flow<List<RoomEntity>>
    
    @Query("SELECT * FROM rooms WHERE id = :id")
    suspend fun getRoomById(id: Long): RoomEntity?
    
    @Insert
    suspend fun insertRoom(room: RoomEntity): Long
    
    @Update
    suspend fun updateRoom(room: RoomEntity)
    
    @Query("UPDATE rooms SET isAvailable = :isAvailable WHERE id = :roomId")
    suspend fun updateRoomAvailability(roomId: Long, isAvailable: Boolean)
    
    @Query("SELECT COUNT(*) FROM rooms")
    suspend fun getRoomCount(): Int
}
