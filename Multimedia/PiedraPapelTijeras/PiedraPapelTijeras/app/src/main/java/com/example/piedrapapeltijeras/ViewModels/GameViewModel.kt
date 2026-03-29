package com.example.piedrapapeltijeras.ViewModels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.piedrapapeltijeras.database.GameMatch
import com.example.piedrapapeltijeras.models.*
import com.example.piedrapapeltijeras.Repository.GameRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class GameViewModel(private val repository: GameRepository) : ViewModel() {

    private val _gameState = MutableStateFlow(GameState())
    val gameState: StateFlow<GameState> = _gameState.asStateFlow()

    val allMatches = repository.allMatches

    fun setPlayerName(name: String) {
        _gameState.value = _gameState.value.copy(playerName = name)
    }

    fun setTotalRounds(rounds: Int) {
        _gameState.value = _gameState.value.copy(totalRounds = rounds)
    }

    fun startGame() {
        if (_gameState.value.playerName.isNotBlank()) {
            _gameState.value = _gameState.value.copy(screen = Screen.GAME)
        }
    }

    fun playRound(playerChoice: Choice?) {
        if (_gameState.value.showResult ||
            _gameState.value.currentRound >= _gameState.value.totalRounds) {
            return
        }

        val finalPlayerChoice = playerChoice ?: Choice.values().random()
        val aiChoice = Choice.values().random()

        val result = determineWinner(finalPlayerChoice, aiChoice)

        val newPlayerScore = if (result == RoundResult.GANA) {
            _gameState.value.playerScore + 1
        } else {
            _gameState.value.playerScore
        }

        val newAiScore = if (result == RoundResult.PIERDE) {
            _gameState.value.aiScore + 1
        } else {
            _gameState.value.aiScore
        }

        _gameState.value = _gameState.value.copy(
            playerChoice = finalPlayerChoice,
            aiChoice = aiChoice,
            roundResult = result,
            showResult = true,
            playerScore = newPlayerScore,
            aiScore = newAiScore,
            currentRound = _gameState.value.currentRound + 1
        )

        if (_gameState.value.currentRound >= _gameState.value.totalRounds) {
            viewModelScope.launch {
                delay(2000)
                saveGameMatch()
                _gameState.value = _gameState.value.copy(screen = Screen.WINNER)
            }
        }
    }

    fun nextRound() {
        _gameState.value = _gameState.value.copy(
            playerChoice = null,
            aiChoice = null,
            roundResult = null,
            showResult = false
        )
    }

    fun restartGame() {
        _gameState.value = _gameState.value.copy(
            screen = Screen.GAME,
            currentRound = 0,
            playerScore = 0,
            aiScore = 0,
            playerChoice = null,
            aiChoice = null,
            roundResult = null,
            showResult = false
        )
    }

    fun newGame() {
        _gameState.value = GameState()
    }

    fun goToHistory() {
        _gameState.value = _gameState.value.copy(screen = Screen.HISTORY)
    }

    fun goToWelcome() {
        _gameState.value = GameState()
    }

    fun deleteMatch(match: GameMatch) {
        viewModelScope.launch {
            repository.deleteMatch(match)
        }
    }

    fun deleteAllMatches() {
        viewModelScope.launch {
            repository.deleteAllMatches()
        }
    }

    private fun saveGameMatch() {
        viewModelScope.launch {
            val match = GameMatch(
                playerName = _gameState.value.playerName,
                playerScore = _gameState.value.playerScore,
                aiScore = _gameState.value.aiScore,
                totalRounds = _gameState.value.totalRounds
            )
            repository.insertMatch(match)
        }
    }

    private fun determineWinner(player: Choice, ai: Choice): RoundResult {
        if (player == ai) return RoundResult.EMPATE

        return when (player) {
            Choice.PIEDRA -> if (ai == Choice.TIJERAS) RoundResult.GANA else RoundResult.PIERDE
            Choice.PAPEL -> if (ai == Choice.PIEDRA) RoundResult.GANA else RoundResult.PIERDE
            Choice.TIJERAS -> if (ai == Choice.PAPEL) RoundResult.GANA else RoundResult.PIERDE
        }
    }
}
