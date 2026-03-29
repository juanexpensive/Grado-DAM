package com.example.piedrapapeltijerasroom2.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.piedrapapeltijerasroom2.model.GameChoice
import com.example.piedrapapeltijerasroom2.model.GameEntity
import com.example.piedrapapeltijerasroom2.model.GameState
import com.example.piedrapapeltijerasroom2.model.RoundResult
import com.example.piedrapapeltijerasroom2.repository.GameRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

class GameViewModel(private val repository: GameRepository) : ViewModel() {

    private val _uiState = MutableStateFlow(GameState())
    val uiState: StateFlow<GameState> = _uiState.asStateFlow()

    val historyList: StateFlow<List<GameEntity>> = repository.getAllGames()
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    fun startGame(name: String, rounds: Int) {
        _uiState.update { GameState(playerName = name, maxRounds = rounds) }
    }

    fun playTurn(playerChoice: GameChoice) {
        val current = _uiState.value
        if (current.isGameOver) return

        val aiChoice = repository.getAiChoice()
        val result = repository.determineWinner(playerChoice, aiChoice)

        var pScore = current.playerScore
        var aScore = current.aiScore

        val msg = when (result) {
            RoundResult.PLAYER_WINS -> { pScore++; "Ganas ronda" }
            RoundResult.AI_WINS -> { aScore++; "Pierdes ronda" }
            RoundResult.DRAW -> "Empate"
        }

        val nextRound = current.currentRound + 1
        val isGameOver = current.currentRound >= current.maxRounds

        var finalMsg = ""

        if (isGameOver) {
            finalMsg = repository.getFinalMessage(pScore, aScore, current.playerName)
            saveGameToHistory(current.playerName, pScore, aScore, finalMsg)
        }

        _uiState.update {
            it.copy(
                playerChoice = playerChoice,
                aiChoice = aiChoice,
                playerScore = pScore,
                aiScore = aScore,
                roundMessage = msg,
                currentRound = if (isGameOver) current.currentRound else nextRound,
                isGameOver = isGameOver,
                finalMessage = finalMsg
            )
        }
    }

    private fun saveGameToHistory(name: String, pScore: Int, aScore: Int, result: String) {
        viewModelScope.launch {
            repository.saveGameResult(name, pScore, aScore, result)
        }
    }

    fun playRandom() {
        playTurn(repository.getAiChoice())
    }

    fun resetGame() {
        val oldState = _uiState.value
        _uiState.value = GameState(playerName = oldState.playerName, maxRounds = oldState.maxRounds)
    }

    fun exitGame() {
        _uiState.value = GameState()
    }
}

class GameViewModelFactory(private val repository: GameRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(GameViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return GameViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}