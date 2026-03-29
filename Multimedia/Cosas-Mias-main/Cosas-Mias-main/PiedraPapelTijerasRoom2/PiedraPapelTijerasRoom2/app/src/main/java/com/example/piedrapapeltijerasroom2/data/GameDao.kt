package com.example.piedrapapeltijerasroom2.data

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import com.example.piedrapapeltijerasroom2.model.GameEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface GameDao {
    @Insert
    suspend fun insertGame(game: GameEntity)

    @Query("SELECT * FROM game_history ORDER BY id DESC")
    fun getAllGames(): Flow<List<GameEntity>>
}