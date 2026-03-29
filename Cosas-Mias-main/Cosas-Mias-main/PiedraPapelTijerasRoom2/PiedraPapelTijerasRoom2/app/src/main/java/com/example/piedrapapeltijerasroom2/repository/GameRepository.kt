package com.example.piedrapapeltijerasroom2.repository

import com.example.piedrapapeltijerasroom2.data.GameDao
import com.example.piedrapapeltijerasroom2.model.GameChoice
import com.example.piedrapapeltijerasroom2.model.GameEntity
import com.example.piedrapapeltijerasroom2.model.RoundResult
import kotlinx.coroutines.flow.Flow
import kotlin.random.Random

class GameRepository(private val gameDao: GameDao) {

    fun getAllGames(): Flow<List<GameEntity>> {
        return gameDao.getAllGames()
    }

    suspend fun saveGameResult(playerName: String, pScore: Int, aScore: Int, msg: String) {
        val entity = GameEntity(
            playerName = playerName,
            playerScore = pScore,
            aiScore = aScore,
            resultMessage = msg
        )
        gameDao.insertGame(entity)
    }

    fun getAiChoice(): GameChoice {
        val choices = listOf(GameChoice.ROCK, GameChoice.PAPER, GameChoice.SCISSORS)
        return choices[Random.nextInt(choices.size)]
    }

    fun determineWinner(player: GameChoice, ai: GameChoice): RoundResult {
        if (player == ai) return RoundResult.DRAW
        return when (player) {
            GameChoice.ROCK -> if (ai == GameChoice.SCISSORS) RoundResult.PLAYER_WINS else RoundResult.AI_WINS
            GameChoice.PAPER -> if (ai == GameChoice.ROCK) RoundResult.PLAYER_WINS else RoundResult.AI_WINS
            GameChoice.SCISSORS -> if (ai == GameChoice.PAPER) RoundResult.PLAYER_WINS else RoundResult.AI_WINS
            GameChoice.NONE -> RoundResult.DRAW
        }
    }

    fun getFinalMessage(pScore: Int, aScore: Int, name: String): String {
        return when {
            pScore > aScore -> "¡Victoria de $name!"
            aScore > pScore -> "La IA gana."
            else -> "Empate."
        }
    }
}