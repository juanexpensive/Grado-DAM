package com.example.piedrapapeltijeras

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.*
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.piedrapapeltijeras.database.GameDatabase
import com.example.piedrapapeltijeras.models.Screen
import com.example.piedrapapeltijeras.Repository.GameRepository
import com.example.piedrapapeltijeras.ui.theme.screens.*
import com.example.piedrapapeltijeras.ViewModels.GameViewModel
import com.example.piedrapapeltijeras.ViewModels.GameViewModelFactory

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val database = GameDatabase.getDatabase(applicationContext)
        val repository = GameRepository(database.gameMatchDao())

        setContent {
            RockPaperScissorsApp(repository = repository)
        }
    }
}
@Composable
fun RockPaperScissorsApp(
    repository: GameRepository,
    viewModel: GameViewModel = viewModel(
        factory = GameViewModelFactory(repository)
    )
) {
    val gameState by viewModel.gameState.collectAsState()
    val matches by viewModel.allMatches.collectAsState(initial = emptyList())

    when (gameState.screen) {
        Screen.WELCOME -> {
            WelcomeScreen(
                gameState = gameState,
                onNameChange = viewModel::setPlayerName,
                onRoundsChange = viewModel::setTotalRounds,
                onStartGame = viewModel::startGame,
                onGoToHistory = viewModel::goToHistory
            )
        }

        Screen.GAME -> {
            GameScreen(
                gameState = gameState,
                onPlayRound = viewModel::playRound,
                onNextRound = viewModel::nextRound
            )
        }

        Screen.WINNER -> {
            WinnerScreen(
                gameState = gameState,
                onRestartGame = viewModel::restartGame,
                onNewGame = viewModel::newGame,
                onGoToHistory = viewModel::goToHistory
            )
        }

        Screen.HISTORY -> {
            HistoryScreen(
                matches = matches,
                onDeleteMatch = viewModel::deleteMatch,
                onDeleteAll = viewModel::deleteAllMatches,
                onBack = viewModel::goToWelcome
            )
        }
    }
}