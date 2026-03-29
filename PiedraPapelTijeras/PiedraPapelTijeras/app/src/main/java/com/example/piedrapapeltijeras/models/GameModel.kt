package com.example.piedrapapeltijeras.models

enum class Choice {
    PIEDRA, PAPEL, TIJERAS;

    fun getEmoji(): String = when (this) {
        PIEDRA -> "✊"
        PAPEL -> "✋"
        TIJERAS -> "✌️"
    }
}

enum class RoundResult {
    GANA, PIERDE, EMPATE
}

data class GameState(
    val screen: Screen = Screen.WELCOME,
    val playerName: String = "",
    val totalRounds: Int = 3,
    val currentRound: Int = 0,
    val playerScore: Int = 0,
    val aiScore: Int = 0,
    val playerChoice: Choice? = null,
    val aiChoice: Choice? = null,
    val roundResult: RoundResult? = null,
    val showResult: Boolean = false
)

enum class Screen {
    WELCOME, GAME, WINNER, HISTORY
}

object GameConstants {
    const val AI_NAME = "Clanker"
}