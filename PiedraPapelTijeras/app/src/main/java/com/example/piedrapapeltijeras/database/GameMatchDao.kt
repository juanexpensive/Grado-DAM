package com.example.piedrapapeltijeras.database

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface GameMatchDao {
    @Query("SELECT * FROM game_matches ORDER BY playerScore DESC, timestamp DESC")
    fun getAllMatchesOrderedByVictories(): Flow<List<GameMatch>>

    @Query("SELECT * FROM game_matches WHERE playerName = :playerName ORDER BY timestamp DESC")
    fun getMatchesByPlayer(playerName: String): Flow<List<GameMatch>>

    @Insert
    suspend fun insertMatch(match: GameMatch): Long

    @Delete
    suspend fun deleteMatch(match: GameMatch)

    @Query("DELETE FROM game_matches")
    suspend fun deleteAllMatches()

    @Query("SELECT COUNT(*) FROM game_matches WHERE isVictory = 1 AND playerName = :playerName")
    suspend fun getVictoriesCount(playerName: String): Int

    @Query("SELECT COUNT(*) FROM game_matches WHERE isVictory = 0 AND playerName = :playerName")
    suspend fun getDefeatsCount(playerName: String): Int
}