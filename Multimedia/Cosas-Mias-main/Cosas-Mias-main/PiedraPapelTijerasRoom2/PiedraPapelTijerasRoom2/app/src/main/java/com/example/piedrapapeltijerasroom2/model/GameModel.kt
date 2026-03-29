package com.example.piedrapapeltijerasroom2.model

enum class GameChoice(val icon: String) {
    ROCK("🪨"),
    PAPER("📄"),
    SCISSORS("✂️"),
    NONE("❓")
}

enum class RoundResult {
    PLAYER_WINS, AI_WINS, DRAW
}

data class GameState(
    val playerName: String = "Jugador",
    val maxRounds: Int = 5,
    val currentRound: Int = 1,
    val playerChoice: GameChoice = GameChoice.NONE,
    val aiChoice: GameChoice = GameChoice.NONE,
    val playerScore: Int = 0,
    val aiScore: Int = 0,
    val roundMessage: String = "¡Empieza el juego!",
    val isGameOver: Boolean = false,
    val finalMessage: String = ""
)