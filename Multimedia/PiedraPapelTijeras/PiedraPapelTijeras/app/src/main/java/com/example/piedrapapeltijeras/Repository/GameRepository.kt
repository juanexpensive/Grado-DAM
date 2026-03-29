package com.example.piedrapapeltijeras.Repository

import com.example.piedrapapeltijeras.database.GameMatch
import com.example.piedrapapeltijeras.database.GameMatchDao
import kotlinx.coroutines.flow.Flow

class GameRepository(private val gameMatchDao: GameMatchDao) {

    val allMatches: Flow<List<GameMatch>> = gameMatchDao.getAllMatchesOrderedByVictories()

    suspend fun insertMatch(match: GameMatch): Long {
        return gameMatchDao.insertMatch(match)
    }

    suspend fun deleteMatch(match: GameMatch) {
        gameMatchDao.deleteMatch(match)
    }

    suspend fun deleteAllMatches() {
        gameMatchDao.deleteAllMatches()
    }

    fun getMatchesByPlayer(playerName: String): Flow<List<GameMatch>> {
        return gameMatchDao.getMatchesByPlayer(playerName)
    }

    suspend fun getPlayerStats(playerName: String): Pair<Int, Int> {
        val victories = gameMatchDao.getVictoriesCount(playerName)
        val defeats = gameMatchDao.getDefeatsCount(playerName)
        return Pair(victories, defeats)
    }
}
